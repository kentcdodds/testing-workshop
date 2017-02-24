import faker from 'faker'
import mongoose from 'mongoose'
import getUserSchema from '../../src/models/user'
import generateUser from '../../other/generate/user'
import {commonProps} from './utils'

const User = mongoose.model('User', getUserSchema())

export default createUser

function createUser(overrides = {}) {
  return Object.assign(
    new User({
      ...commonProps(),
      ...generateUser(overrides),
    }),
    {_id: faker.random.uuid()},
  )
}
