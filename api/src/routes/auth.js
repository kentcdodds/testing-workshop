import {getTokenFromHeader} from './utils'
const jwt = require('express-jwt')
const secret = require('../config').secret

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
