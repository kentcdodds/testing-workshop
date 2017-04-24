import express from 'express'
import mongoose from 'mongoose'
import passport from 'passport'
import auth from '../auth'

export default getUsersRouter

function getUsersRouter() {
  const router = express.Router()
  const User = mongoose.model('User')

  // Preload user objects on routes with ':username'
  router.param('username', async (req, res, next, username) => {
    const user = await User.findOne({username}).catch(() => {
      res.sendStatus(500) // TODO make this more helpful
    })
    if (!user) {
      return res.sendStatus(404)
    }
    req.user = user
    next()
  })

  router.get('/user', auth.required, (req, res, next) => {
    User.findById(req.payload.id)
      .then(user => {
        if (!user) {
          return res.sendStatus(401)
        }

        return res.json({user: user.toAuthJSON()})
      })
      .catch(next)
  })

  router.put('/user', auth.required, (req, res, next) => {
    User.findById(req.payload.id)
      .then(user => {
        if (!user) {
          return res.sendStatus(401)
        }

        // only update fields that were actually passed...
        if (typeof req.body.user.username !== 'undefined') {
          user.username = req.body.user.username
        }
        if (typeof req.body.user.email !== 'undefined') {
          user.email = req.body.user.email
        }
        if (typeof req.body.user.bio !== 'undefined') {
          user.bio = req.body.user.bio
        }
        if (typeof req.body.user.image !== 'undefined') {
          user.image = req.body.user.image
        }
        if (typeof req.body.user.password !== 'undefined') {
          user.setPassword(req.body.user.password)
        }

        return user.save().then(() => {
          return res.json({user: user.toAuthJSON()})
        })
      })
      .catch(next)
  })

  router.post('/users/login', (req, res, next) => {
    if (!req.body.user.email) {
      return res.status(422).json({errors: {email: "can't be blank"}})
    }

    if (!req.body.user.password) {
      return res.status(422).json({errors: {password: "can't be blank"}})
    }

    passport.authenticate('local', {session: false}, (err, user, info) => {
      if (err) {
        return next(err)
      }

      if (user) {
        user.token = user.generateJWT()
        return res.json({user: user.toAuthJSON()})
      } else {
        return res.status(422).json(info)
      }
    })(req, res, next)
  })

  router.post('/users', (req, res, next) => {
    const user = new User()

    user.username = req.body.user.username
    user.email = req.body.user.email
    user.setPassword(req.body.user.password)

    user
      .save()
      .then(() => {
        return res.json({user: user.toAuthJSON()})
      })
      .catch(next)
  })

  // delete user
  router.delete('/users/:username', auth.required, async (req, res) => {
    await User.findById(req.payload.id)

    if (req.user._id.toString() === req.payload.id.toString()) {
      await req.user.remove()
      return res.sendStatus(204)
    } else {
      return res.sendStatus(403)
    }
  })

  return router
}
