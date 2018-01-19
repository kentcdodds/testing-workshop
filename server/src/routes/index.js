import express from 'express'
import setupUserRoutes from './users'
import setupAuthRoutes from './auth'
import setupPostRoutes from './posts'

function setupRoutes(app) {
  const authRouter = express.Router()
  setupAuthRoutes(authRouter)
  app.use('/api/auth', authRouter)

  const userRouter = express.Router()
  setupUserRoutes(userRouter)
  app.use('/api/users', userRouter)

  const postRouter = express.Router()
  setupPostRoutes(postRouter)
  app.use('/api/posts', postRouter)
}

export default setupRoutes
