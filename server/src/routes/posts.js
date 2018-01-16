import {authMiddleware} from '../auth'
import db from '../db'

function setupPostRoutes(router) {
  const authorize = async (req, res, next) => {
    const {authorId} = await db.getPost(req.params.id)
    if (req.user.id === authorId) {
      return next()
    } else {
      return res.status(403).send()
    }
  }

  router.get('/', async (req, res) => {
    const posts = await db.getPosts()
    if (posts) {
      res.json({posts})
    } else {
      res.status(404).send()
    }
  })

  router.get('/:id', async (req, res) => {
    const post = await db.getPost(req.params.id)
    if (post) {
      res.json({post})
    } else {
      res.status(404).send()
    }
  })

  router.post('/', authMiddleware.required, async (req, res) => {
    const post = await db.insertPost(req.body)
    if (post) {
      res.json({post})
    } else {
      res.status(404).send()
    }
  })

  router.put('/:id', authMiddleware.required, authorize, async (req, res) => {
    if (req.post.id !== req.params.id) {
      return res.status(403).send()
    }
    const post = await db.updatePost(req.params.id, req.body)
    if (post) {
      return res.json({post})
    } else {
      return res.status(404).send()
    }
  })

  router.delete(
    '/:id',
    authMiddleware.required,
    authorize,
    async (req, res) => {
      const post = await db.deletePost(req.params.id)
      if (post) {
        return res.json({post})
      } else {
        return res.status(404).send()
      }
    }
  )
}

export default setupPostRoutes
