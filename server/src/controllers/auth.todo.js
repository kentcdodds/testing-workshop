import passport from 'passport'
import {getSaltAndHash, userToJSON, getUserToken} from '../utils/auth'
import db from '../utils/db'

const authUserToJSON = user => ({
  ...userToJSON(user),
  token: getUserToken(user),
})

async function register(req, res) {
  const {username, password} = req.body
  if (!username) {
    return res.status(422).json({errors: {username: `can't be blank`}})
  }

  if (!password) {
    return res.status(422).json({errors: {password: `can't be blank`}})
  }
  const existingUser = (await db.getUsers(u => u.username === username))[0]
  if (existingUser) {
    return res.status(422).json({errors: {username: 'taken'}})
  }
  const newUser = await db.insertUser({
    username,
    ...getSaltAndHash(password),
  })
  return res.json({user: authUserToJSON(newUser)})
}

async function login(req, res, next) {
  if (!req.body.username) {
    return res.status(422).json({errors: {username: `can't be blank`}})
  }

  if (!req.body.password) {
    return res.status(422).json({errors: {password: `can't be blank`}})
  }
  const {user, info} = await authenticate(req, res, next)

  if (user) {
    return res.json({user: authUserToJSON(user)})
  } else {
    return res.status(422).json(info)
  }
}

function authenticate(req, res, next) {
  return new Promise((resolve, reject) => {
    passport.authenticate('local', {session: false}, (err, user, info) => {
      if (err) {
        reject(err)
      } else {
        resolve({user, info})
      }
    })(req, res, next)
  })
}

async function me(req, res) {
  if (req.user) {
    // 👋 there's a bug here 😉
    // there's a handy utility method in this file
    // you might like called `authUserToJSON`
    return res.json({user: req.user})
  } else {
    return res.status(404).send()
  }
}

export {me, login, register}
