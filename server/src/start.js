import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import passport from 'passport'
import logger from 'loglevel'
import 'express-async-errors'
import {getLocalStrategy} from './auth'
import setupUserRoutes from './routes/users'
import setupAuthRoutes from './routes/auth'
import setupPostRoutes from './routes/posts'
import setupMiscRoutes from './routes/misc'

function startServer() {
  const app = express()
  app.use(cors())
  app.use(bodyParser.json())
  app.use(passport.initialize())
  passport.use(getLocalStrategy())

  const authRouter = express.Router()
  setupAuthRoutes(authRouter)
  app.use('/api/auth', authRouter)

  const userRouter = express.Router()
  setupUserRoutes(userRouter)
  app.use('/api/users', userRouter)

  const postRouter = express.Router()
  setupPostRoutes(postRouter)
  app.use('/api/posts', postRouter)

  const miscRouter = express.Router()
  setupMiscRoutes(miscRouter)
  app.use('/api/misc', miscRouter)

  return new Promise(resolve => {
    const server = app.listen(process.env.PORT || 8000, () => {
      logger.info(`Listening on port ${server.address().port}`)
      const originalClose = server.close.bind(server)
      server.close = () => {
        return new Promise(resolveClose => {
          originalClose(resolveClose)
        })
      }
      resolve(server)
    })
  })
}

export default startServer
