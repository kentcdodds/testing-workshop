import passport from 'passport'
import {authMiddleware, getSaltAndHash, userToJSON, getUserToken} from '../auth'
import db from '../db'

const authUserToJSON = user => ({
  ...userToJSON(user),
  token: getUserToken(user),
})

function setupAuthRoutes(router) {
  router.post('/register', async (req, res) => {
    const {username, password} = req.body
    if (!username) {
      return res.status(422).json({errors: {username: `can't be blank`}})
    }

    if (!password) {
      return res.status(422).json({errors: {password: `can't be blank`}})
    }
    const existingUser = await db.getUser(u => u.username === username)
    if (existingUser) {
      return res.status(422).json({errors: {username: 'taken'}})
    }
    const newUser = await db.insertUser({
      username,
      ...getSaltAndHash(password),
    })
    return res.json({user: authUserToJSON(newUser)})
  })

  router.post('/login', (req, res, next) => {
    if (!req.body.username) {
      return res.status(422).json({errors: {username: `can't be blank`}})
    }

    if (!req.body.password) {
      return res.status(422).json({errors: {password: `can't be blank`}})
    }

    return passport.authenticate(
      'local',
      {session: false},
      (err, user, info) => {
        if (err) {
          return next(err)
        }

        if (user) {
          return res.json({user: authUserToJSON(user)})
        } else {
          return res.status(422).json(info)
        }
      },
    )(req, res, next)
  })

  router.get('/me', authMiddleware.required, async (req, res) => {
    if (req.user) {
      return res.json({user: userToJSON(req.user)})
    } else {
      return res.status(404).send()
    }
  })
}

export default setupAuthRoutes
