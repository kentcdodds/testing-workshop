import express from 'express'
import mongoose from 'mongoose'
import auth from '../auth'

export default getProfilesRouter

function getProfilesRouter() {
  const router = express.Router()
  const User = mongoose.model('User')

  // Preload article objects on routes with ':username'
  router.param('username', (req, res, next, username) => {
    User.findOne({username})
      .then(user => {
        if (!user) {
          return res.sendStatus(404)
        }

        req.profile = user

        return next()
      })
      .catch(next)
  })

  router.get('/:username', auth.optional, (req, res) => {
    if (req.payload) {
      User.findById(req.payload.id).then(user => {
        if (!user) {
          return res.json({profile: req.profile.toProfileJSONFor(false)})
        }

        return res.json({profile: req.profile.toProfileJSONFor(user)})
      })
    } else {
      return res.json({profile: req.profile.toProfileJSONFor(false)})
    }
  })

  router.post('/:username/follow', auth.required, (req, res, next) => {
    const profileId = req.profile._id

    User.findById(req.payload.id)
      .then(user => {
        if (!user) {
          return res.sendStatus(401)
        }

        return user.follow(profileId).then(() => {
          return res.json({profile: req.profile.toProfileJSONFor(user)})
        })
      })
      .catch(next)
  })

  router.delete('/:username/follow', auth.required, (req, res, next) => {
    const profileId = req.profile._id

    User.findById(req.payload.id)
      .then(user => {
        if (!user) {
          return res.sendStatus(401)
        }

        return user.unfollow(profileId).then(() => {
          return res.json({profile: req.profile.toProfileJSONFor(user)})
        })
      })
      .catch(next)
  })

  return router
}
