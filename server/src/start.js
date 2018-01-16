import express from 'express'
import bodyParser from 'body-parser'
import passport from 'passport'
import logger from 'loglevel'
import 'express-async-errors'
import {getLocalStrategy} from './auth'
import setupUserRoutes from './routes/users'
import setupAuthRoutes from './routes/auth'

function startServer() {
  const app = express()
  app.use(bodyParser.json())
  app.use(passport.initialize())
  passport.use(getLocalStrategy())

  const authRouter = express.Router()
  setupAuthRoutes(authRouter)
  app.use('/api/auth', authRouter)

  const userRouter = express.Router()
  setupUserRoutes(userRouter)
  app.use('/api/users', userRouter)

  return new Promise(resolve => {
    const server = app.listen(process.env.PORT || 3000, () => {
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
