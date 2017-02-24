import faker from 'faker'
import mongoose from 'mongoose'
import generateArticleData
  from '../../src/models/__tests__/helpers/generate/article'
import getArticleSchema from '../../src/models/article'
import {commonProps} from './utils'

const Article = mongoose.model('Article', getArticleSchema())

export default createArticle

function createArticle(author) {
  return Object.assign(
    new Article({
      ...commonProps(author.createdAt),
      ...generateArticleData(author),
    }),
    {_id: faker.random.uuid()},
  )
}
