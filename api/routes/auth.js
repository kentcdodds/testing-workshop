const jwt = require('express-jwt')
const secret = require('../config').secret

function getTokenFromHeader(req) {
  if (
    req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Token'
  ) {
    return req.headers.authorization.split(' ')[1]
  }

  return null
}

const auth = {
  required: jwt({
    secret,
    userProperty: 'payload',
    getToken: getTokenFromHeader,
  }),
  optional: jwt({
    secret,
    userProperty: 'payload',
    credentialsRequired: false,
    getToken: getTokenFromHeader,
  }),
}

module.exports = auth
