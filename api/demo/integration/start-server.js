import _ from 'lodash'
import faker from 'faker'
import express from 'express'
import bodyParser from 'body-parser'
import getTokenFromHeader from '../../src/routes/utils/get-token-from-header'

export default startServer

const users = _.times(20, () => faker.helpers.contextualCard())
const userAuth = {
  username: 'jane',
  password: 'I have a secure password',
}
const user = {
  token: 'Wanna-hear-a-secret?-I-sometimes-sing-in-the-shower!',
}

function startServer() {
  const app = express()

  app.use(bodyParser.json())

  function auth(req, res, next) {
    const token = getTokenFromHeader(req)
    if (!token || token !== user.token) {
      res.sendStatus(401)
    } else {
      next()
    }
  }

  const userRouter = express.Router()
  userRouter.get('/', (req, res) => {
    const {query: {limit = 20, offset = 0}} = req
    res.json({users: _.take(users.slice(offset), limit)})
  })

  // Preload user objects on routes with ':username'
  userRouter.param('username', (req, res, next, param) => {
    req.user = users.find(({username}) => username === param)
    next()
  })

  userRouter.get('/:username', (req, res) => {
    if (req.user) {
      res.json({user: req.user})
    } else {
      res.sendStatus(404)
    }
  })

  userRouter.post('/', auth, (req, res) => {
    users.unshift(req.body.user)
    res.json({user: users[0]})
  })

  userRouter.delete('/:username', auth, (req, res) => {
    users.splice(users.indexOf(req.user), 1)
    res.json({success: true})
  })

  const authRouter = express.Router()
  authRouter.post('/', (req, res) => {
    if (
      req.body.username === userAuth.username &&
      req.body.password === userAuth.password
    ) {
      res.json({user})
    } else {
      res.sendStatus(401)
    }
  })

  const apiRouter = express.Router()
  apiRouter.use('/users', userRouter)
  apiRouter.use('/auth', authRouter)

  app.use('/api', apiRouter)

  return new Promise(resolve => {
    const server = app.listen(3001, () => {
      resolve(server)
    })
  })
}
