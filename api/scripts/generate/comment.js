import faker from 'faker'
import mongoose from 'mongoose'
import getCommentSchema from '../../src/models/comment'
import {commonProps} from './utils'

const Comment = mongoose.model('Comment', getCommentSchema())

export default createComment

function createComment(article, author) {
  return Object.assign(
    new Comment({
      ...commonProps(article.createdAt),
      article: article._id,
      author: author._id,
      body: faker.lorem.sentences(),
    }),
    {_id: faker.random.uuid()},
  )
}
