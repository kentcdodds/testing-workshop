const mongoose = require('mongoose')
const router = require('express').Router() // eslint-disable-line babel/new-cap

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

module.exports = router
