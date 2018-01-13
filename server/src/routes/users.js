import express from 'express'
import passport from 'passport'
import {authMiddleware} from '../auth'
import db from '../db'

function setupUserRoutes(router) {
  const authorize = (req, res, next) => {
    if (req.user.id === req.params.id) {
      return next()
    } else {
      return res.status(403).send()
    }
  }

  router.get('/me', authMiddleware.required, (req, res) => {
    return res.json(req.user)
  })

  router.post('/login', (req, res, next) => {
    if (!req.body.email) {
      return res.status(422).json({errors: {email: "can't be blank"}})
    }

    if (!req.body.password) {
      return res.status(422).json({errors: {password: "can't be blank"}})
    }

    passport.authenticate('local', {session: false}, (err, user, info) => {
      if (err) {
        return next(err)
      }

      if (user) {
        return res.json({user})
      } else {
        return res.status(422).json(info)
      }
    })(req, res, next)
  })

  router.get('/', async (req, res) => {
    const users = await db.getUsers()
    if (users) {
      res.json(users)
    } else {
      res.status(404).send()
    }
  })

  router.get('/:id', async (req, res) => {
    const user = await db.getUser(req.params.id)
    if (user) {
      res.json(user)
    } else {
      res.status(404).send()
    }
  })

  router.post('/', async (req, res) => {
    const user = await db.insertUser(req.body)
    if (user) {
      res.json(user)
    } else {
      res.status(404).send()
    }
  })

  router.put('/:id', authMiddleware.required, authorize, async (req, res) => {
    if (req.user.id !== req.params.id) {
      return res.status(403).send()
    }
    const user = await db.updateUser(req.params.id, req.body)
    if (user) {
      res.json(user)
    } else {
      res.status(404).send()
    }
  })

  router.delete(
    '/:id',
    authMiddleware.required,
    authorize,
    async (req, res) => {
      const user = await db.deleteUser(req.params.id)
      if (user) {
        res.json(user)
      } else {
        res.status(404).send()
      }
    }
  )
}

export default setupUserRoutes
