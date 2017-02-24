import express from 'express'
import bodyParser from 'body-parser'
import session from 'express-session'
import cors from 'cors'
import errorhandler from 'errorhandler'
import mongoose from 'mongoose'
import morgan from 'morgan'
import methodOverride from 'method-override'
import setupModels from './models'
import setupPassport from './config/passport'
import getRouter from './routes'

const isProduction = process.env.NODE_ENV === 'production'

// use native promises
mongoose.Promise = Promise

// Create global app object
const app = express()

app.use(cors())

// Normal express config defaults
app.use(morgan('dev'))
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

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
  if ('MONGODB_DEBUG' in process.env) {
    mongoose.set('debug', true)
  }
} else {
  mongoose.connect('mongodb://localhost/conduit')
}

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
    console.log(err.stack)

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
  res.status(err.status || 500)
  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  })
})

// finally, let's start our server...
const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${server.address().port}`)
})
