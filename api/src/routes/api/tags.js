import mongoose from 'mongoose'
import express from 'express'

export default getTagsRouter

function getTagsRouter() {
  const router = express.Router()
  const Article = mongoose.model('Article')

  // return a list of tags
  router.get('/', (req, res, next) => {
    Article.find()
      .distinct('tagList')
      .then(tags => {
        return res.json({tags})
      })
      .catch(next)
  })

  return router
}
