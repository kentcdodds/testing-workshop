const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const secret = 'secret'

const iterations = process.env.NODE_ENV === 'production' ? 100000 : 1

function getSaltAndHash(password) {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto
    .pbkdf2Sync(password, salt, iterations, 512, 'sha512')
    .toString('hex')
  return {salt, hash}
}

function isPasswordValid(password, {salt, hash}) {
  return (
    hash ===
    crypto.pbkdf2Sync(password, salt, iterations, 512, 'sha512').toString('hex')
  )
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
    secret,
  )
}

module.exports = {getSaltAndHash, isPasswordValid, getUserToken, secret}
