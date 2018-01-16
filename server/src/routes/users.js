import passport from 'passport'
import {authMiddleware, userToJSON, getUserToken} from '../auth'
import db from '../db'

function setupUserRoutes(router) {
  const authorize = (req, res, next) => {
    if (req.user.id === req.params.id) {
      return next()
    } else {
      return res.status(403).send()
    }
  }

  router.get('/', async (req, res) => {
    const users = await db.getUsers()
    if (users) {
      res.json({users: users.map(u => userToJSON(u))})
    } else {
      res.status(404).send()
    }
  })

  router.get('/:id', authMiddleware.optional, async (req, res) => {
    const user = await db.getUser(req.params.id)
    if (user) {
      res.json({
        user: {
          ...userToJSON(user),
          token:
            req.user && req.user.id === req.params.id
              ? getUserToken(user)
              : undefined,
        },
      })
    } else {
      res.status(404).send()
    }
  })

  router.post('/', async (req, res) => {
    const user = await db.insertUser(req.body)
    if (user) {
      res.json({user: userToJSON(user)})
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
      res.json({user: userToJSON(user)})
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
        res.json({user: userToJSON(user)})
      } else {
        res.status(404).send()
      }
    }
  )
}

export default setupUserRoutes
