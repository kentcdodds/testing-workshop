import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import expressJWT from 'express-jwt'
import LocalStrategy from 'passport-local'
import {omit} from 'lodash'
import db from './db'

const iterations = process.env.NODE_ENV === 'production' ? 100000 : 1
const secret = 'secret'

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

function isPasswordValid(password, {salt, hash}) {
  return (
    hash ===
    crypto.pbkdf2Sync(password, salt, iterations, 512, 'sha512').toString('hex')
  )
}

function getSaltAndHash(password) {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto
    .pbkdf2Sync(password, salt, iterations, 512, 'sha512')
    .toString('hex')
  return {salt, hash}
}

function userToJSON({id, username, ...otherUserProps}) {
  return {
    id,
    username,
    ...omit(otherUserProps, ['hash', 'salt']),
  }
}

function getUserToken({id, username}) {
  // seconds/minute * minutes/hour * hours/day * 60 days
  const sixtyDaysInSeconds = 60 * 60 * 24 * 60
  return jwt.sign(
    {
      id,
      username,
      exp: Math.floor(Date.now() / 1000) + sixtyDaysInSeconds,
    },
    secret
  )
}

export {
  authMiddleware,
  getSaltAndHash,
  userToJSON,
  getLocalStrategy,
  getUserToken,
}
