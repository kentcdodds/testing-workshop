import mongoose from 'mongoose'
import generateArticleData
  from '../../src/models/__tests__/helpers/generate/article'
import {commonProps} from './utils'

export default createArticle

function createArticle(author) {
  return {
    ...commonProps(author.createdAt),
    ...generateArticleData(author),
    _id: mongoose.Types.ObjectId(),
  }
}
