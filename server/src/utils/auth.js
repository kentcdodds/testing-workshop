import expressJWT from 'express-jwt'
import LocalStrategy from 'passport-local'
import {omit} from 'lodash'
import {
  getSaltAndHash,
  isPasswordValid,
  secret,
  getUserToken,
} from 'til-shared/auth'
import db from './db'

const authMiddleware = {
  required: expressJWT({
    secret,
  }),
  optional: expressJWT({
    secret,
    credentialsRequired: false,
  }),
}

function getLocalStrategy() {
  return new LocalStrategy(async (username, password, done) => {
    let user
    try {
      user = (await db.getUsers(u => u.username === username))[0]
    } catch (error) {
      return done(error)
    }
    if (!user || !isPasswordValid(password, user)) {
      return done(null, false, {
        errors: {'username or password': 'is invalid'},
      })
    }
    return done(null, userToJSON(user))
  })
}

function userToJSON(user) {
  return omit(user, ['exp', 'iat', 'hash', 'salt'])
}

function isPasswordAllowed(password) {
  return password.length > 6 && /\d/.test(password) && /\D/.test(password)
}

export {
  authMiddleware,
  getSaltAndHash,
  userToJSON,
  getLocalStrategy,
  getUserToken,
  isPasswordAllowed,
}
