import mongoose from 'mongoose'
import generateUserData from '../../../other/generate/user'
import {commonProps} from './utils'

export default createUser

function createUser(overrides = {}) {
  return {
    ...commonProps(),
    ...generateUserData(overrides),
    _id: mongoose.Types.ObjectId(),
  }
}
