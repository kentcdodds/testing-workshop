import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import expressJWT from 'express-jwt'
import LocalStrategy from 'passport-local'

const secret = 'secret'

const authMiddleware = {
  required: expressJWT({
    secret,
    userProperty: 'payload',
    getToken: getTokenFromHeader,
  }),
  optional: expressJWT({
    secret,
    userProperty: 'payload',
    credentialsRequired: false,
    getToken: getTokenFromHeader,
  }),
}

function getLocalStrategy() {
  return new LocalStrategy(async (username, password, done) => {
    let user
    try {
      user = await db.getUsers(u => u.username === username)[0]
    } catch (error) {
      return done(error)
    }
    if (!user || !isValidHash(password, user)) {
      return done(null, false, {
        errors: {'email or password': 'is invalid'},
      })
    }
    return done(null, getAuthJSON(user))
  })
}

function isPasswordValid(password, {salt, hash}) {
  return (
    hash ===
    crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex')
  )
}

function getSaltAndHash(password) {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 512, 'sha512')
    .toString('hex')
  return {salt, hash}
}

function getAuthJSON({id, username, ...otherUserProps}) {
  const today = new Date()
  const exp = new Date(today)
  exp.setDate(today.getDate() + 60)

  return {
    id,
    username,
    ...otherUserProps,
    token: jwt.sign(
      {
        id,
        username,
        exp: parseInt(exp.getTime() / 1000, 10),
      },
      secret
    ),
  }
}

function getTokenFromHeader(req) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Token'
  ) {
    return req.headers.authorization.split(' ')[1]
  }
  return null
}

export {authMiddleware, getSaltAndHash, getAuthJSON, getLocalStrategy}
