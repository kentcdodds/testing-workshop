import express from 'express'
import bodyParser from 'body-parser'
import session from 'express-session'
import cors from 'cors'
import errorhandler from 'errorhandler'
import morgan from 'morgan'
import methodOverride from 'method-override'
import logger from 'loglevel'
import setupMongoose from './config/setup-mongoose'
import setupPassport from './config/setup-passport'
import setupModels from './models'
import getRouter from './routes'

const isProduction = process.env.NODE_ENV === 'production'

export default start

async function start() {
  // Create global app object
  const app = express()

  app.use(cors())

  // Normal express config defaults
  if (logger.getLevel() < 3) {
    app.use(morgan('dev'))
  }
  app.use(bodyParser.urlencoded({extended: false}))
  app.use(bodyParser.json())

  app.use(methodOverride())
  app.use(express.static(`${__dirname}/public`))

  app.use(
    session({
      secret: 'conduit',
      cookie: {maxAge: 60000},
      resave: false,
      saveUninitialized: false,
    }),
  )

  if (!isProduction) {
    app.use(errorhandler())
  }

  const cleanupMongoose = await setupMongoose()
  setupModels()
  setupPassport()

  app.use(getRouter())

  /// catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
  })

  /// error handlers

  // development error handler
  // will print stacktrace
  if (!isProduction) {
    app.use((err, req, res) => {
      logger.error(err.stack)

      res.status(err.status || 500)

      res.json({
        errors: {
          message: err.message,
          error: err,
        },
      })
    })
  }

  // production error handler
  // no stacktraces leaked to user
  app.use((err, req, res) => {
    logger.error(err.stack)

    res.status(err.status || 500)

    res.json({
      errors: {
        message: err.message,
        error: {},
      },
    })
  })

  // finally, let's start our server...
  return new Promise(resolve => {
    const server = app.listen(process.env.PORT || 3000, () => {
      logger.info(`Listening on port ${server.address().port}`)
      server.on('close', () => {
        cleanupMongoose()
      })
      resolve(server)
    })
  })
}
