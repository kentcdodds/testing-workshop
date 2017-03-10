import mongoose from 'mongoose'
import faker from 'faker'
import {commonProps} from './utils'

export default createComment

function createComment(article, author) {
  return {
    ...commonProps(article.createdAt),
    article: article._id,
    author: author._id,
    body: faker.lorem.sentences(),
    _id: mongoose.Types.ObjectId(),
  }
}
