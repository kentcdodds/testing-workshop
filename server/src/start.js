import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import passport from 'passport'
import logger from 'loglevel'
import 'express-async-errors'
import detectPort from 'detect-port'
import {getLocalStrategy} from './utils/auth'
import setupRoutes from './routes'

async function startServer({port = process.env.SERVER_PORT} = {}) {
  port = port || (await detectPort(8888))
  const app = express()
  app.use(cors())
  app.use(bodyParser.json())
  app.use(passport.initialize())
  passport.use(getLocalStrategy())

  setupRoutes(app)

  return new Promise(resolve => {
    const server = app.listen(port, () => {
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
