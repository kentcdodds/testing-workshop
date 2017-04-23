import jwt from 'express-jwt'
import {secret} from '../config'
import getTokenFromHeader from './utils/get-token-from-header'

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

export default auth
