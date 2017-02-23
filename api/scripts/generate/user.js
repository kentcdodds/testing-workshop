import crypto from 'crypto'
import faker from 'faker'
import mongoose from 'mongoose'
import getUserSchema from '../../src/models/user'
import {commonProps} from './utils'

const User = mongoose.model('User', getUserSchema())

export default createUser

function createUser(overrides = {}) {
  const {
    username,
    email,
    avatar: image,
  } = faker.helpers.contextualCard()
  const {password = faker.internet.password(), ...otherOverrides} = overrides

  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 512, 'sha512')
    .toString('hex')

  return Object.assign(
    new User({
      ...commonProps(),
      username: username.toLowerCase().replace(/[ |.|_|-]/g, ''),
      email: email.toLowerCase(),
      bio: faker.hacker.phrase(),
      image,
      favorites: ['article id'],
      following: ['user ids'],
      hash,
      salt,
      ...otherOverrides,
    }),
    {_id: faker.random.uuid()},
  )
}
