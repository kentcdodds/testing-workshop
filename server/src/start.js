import express from 'express'
import bodyParser from 'body-parser'
import 'express-async-errors'
import logger from 'loglevel'
import db from './db'
import setupUserRoutes from './routes/users'

function startServer() {
  const app = express()
  app.use(bodyParser.json())
  const userRouter = express.Router()
  setupUserRoutes(userRouter)
  app.use('/api/users', userRouter)

  return new Promise(resolve => {
    const server = app.listen(process.env.PORT || 3000, () => {
      logger.info(`Listening on port ${server.address().port}`)
      const originalClose = server.close.bind(server)
      server.close = function asyncClose() {
        return new Promise(resolve => {
          originalClose(resolve)
        })
      }
      resolve(server)
    })
  })
}

export default startServer
