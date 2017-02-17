import faker from 'faker'
import mongoose from 'mongoose'
import {commonProps} from './utils'
import '../../models/Comment'

const Comment = mongoose.model('Comment')

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
