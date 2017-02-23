import mongoose from 'mongoose'

export default getCommentSchema

function getCommentSchema() {
  const CommentSchema = new mongoose.Schema(
    {
      body: String,
      author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
      article: {type: mongoose.Schema.Types.ObjectId, ref: 'Article'},
    },
    {timestamps: true},
  )

  // Requires population of author
  CommentSchema.methods.toJSONFor = function(user) {
    return {
      id: this._id,
      body: this.body,
      createdAt: this.createdAt,
      author: this.author.toProfileJSONFor(user),
    }
  }

  return CommentSchema
}
