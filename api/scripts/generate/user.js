import faker from 'faker'
import mongoose from 'mongoose'
import getUserSchema from '../../src/models/user'
import generateUserData from '../../src/models/__tests__/helpers/generate/user'
import {commonProps} from './utils'

const User = mongoose.model('User', getUserSchema())

export default createUser

function createUser(overrides = {}) {
  return Object.assign(
    new User({
      ...commonProps(),
      ...generateUserData(overrides),
    }),
    {_id: faker.random.uuid()},
  )
}
