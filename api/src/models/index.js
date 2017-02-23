import mongoose from 'mongoose'
import getUserSchema from './user'
import getCommentSchema from './comment'
import getArticleSchema from './article'

export default setupModels

function setupModels() {
  const UserSchema = getUserSchema()
  const User = mongoose.model('User', UserSchema)

  const CommentSchema = getCommentSchema()
  mongoose.model('Comment', CommentSchema)

  const ArticleSchema = getArticleSchema(User)
  mongoose.model('Article', ArticleSchema)
}
