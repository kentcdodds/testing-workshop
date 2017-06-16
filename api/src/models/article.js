import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import slug from 'slugify'

export default getArticleSchema

function getArticleSchema(User) {
  const ArticleSchema = new mongoose.Schema(
    {
      slug: {type: String, lowercase: true, unique: true},
      title: String,
      description: String,
      body: String,
      favoritesCount: {type: Number, default: 0},
      comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
      tagList: [{type: String}],
      author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    },
    {timestamps: true},
  )

  ArticleSchema.plugin(uniqueValidator, {message: 'is already taken'})

  ArticleSchema.pre('validate', function(next) {
    this.slugify() // eslint-disable-line babel/no-invalid-this

    next()
  })

  ArticleSchema.methods.slugify = function() {
    this.slug = slug(this.title)
  }

  ArticleSchema.methods.updateFavoriteCount = function() {
    return User.count({favorites: {$in: [this._id]}}).then(count => {
      this.favoritesCount = count

      return this.save()
    })
  }

  ArticleSchema.methods.toJSONFor = function(user) {
    return {
      slug: this.slug,
      title: this.title,
      description: this.description,
      body: this.body,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      tagList: this.tagList,
      favorited: user ? user.isFavorite(this._id) : false,
      favoritesCount: this.favoritesCount,
      author: this.author ?
        this.author.toProfileJSONFor(user) :
        {username: 'userRemoved'},
    }
  }

  return ArticleSchema
}
