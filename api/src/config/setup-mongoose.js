import mongoose from 'mongoose'

// use native promises... like... always 🙃
mongoose.Promise = Promise

export default setupMongoose

async function setupMongoose() {
  if ('MONGODB_DEBUG' in process.env) {
    mongoose.set('debug', true)
  }
  if (process.env.MONGODB_URI) {
    await connect(process.env.MONGODB_URI)
  } else {
    await connect('mongodb://localhost/conduit')
  }

  return function cleanup() {
    mongoose.connection.close()
  }
}

function connect(uri) {
  return mongoose.connect(uri).catch(error => {
    console.error(
      'There was a problem connecting mongoose to mongodb',
      'Do you have mongodb running?',
    )
    return Promise.reject(error)
  })
}
