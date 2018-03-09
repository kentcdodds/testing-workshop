const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const secret = 'secret'

const iterations = process.env.NODE_ENV === 'production' ? 100000 : 1

// seconds/minute * minutes/hour * hours/day * 60 days
const sixtyDaysInSeconds = 60 * 60 * 24 * 60
// to keep our tests reliable, we'll use the requireTime if we're not in production
// and we'll use Date.now() if we are.
const requireTime = Date.now()
const now = () =>
  process.env.NODE_ENV === 'production' ? Date.now() : requireTime

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
  const issuedAt = Math.floor(now() / 1000)
  return jwt.sign(
    {
      id,
      username,
      iat: issuedAt,
      exp: issuedAt + sixtyDaysInSeconds,
    },
    secret,
  )
}

module.exports = {getSaltAndHash, isPasswordValid, getUserToken, secret}
