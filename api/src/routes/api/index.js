import express from 'express'
import getUsersRouter from './users'
import getProfilesRouter from './profiles'
import getArticlesRouter from './articles'
import getTagsRouter from './tags'

export default getRouter

function getRouter() {
  const router = express.Router()

  router.use('/', getUsersRouter())
  router.use('/profiles', getProfilesRouter())
  router.use('/articles', getArticlesRouter())
  router.use('/tags', getTagsRouter())

  router.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
      return res.status(422).json({
        errors: Object.keys(err.errors).reduce(
          (errors, key) => {
            errors[key] = err.errors[key].message

            return errors
          },
          {},
        ),
      })
    }

    return next(err)
  })
  return router
}
