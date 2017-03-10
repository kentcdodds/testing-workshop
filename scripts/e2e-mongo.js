const path = require('path')
const {spawnPromise} = require('./e2e-shared')

const cwd = path.join(__dirname, '..')

const dbPath = path.join(cwd, '.e2e/mongo-db')
const mongoPort = 27018
const mongoUri = `mongodb://localhost:${mongoPort}/conduit`

// start e2e mongo
const startMongoCommand = {
  script: `mongod --dbpath ${dbPath} --port ${mongoPort}`,
  message: '🔑  starting mongodb',
}

const stdio = process.env.STDIO || ['pipe', 'pipe', process.stderr]
spawnPromise(startMongoCommand, {
  cwd,
  stdio,
  env: Object.assign({}, process.env, {MONGODB_URI: mongoUri}),
}).promise.then(
  () => {
    console.log('🏁  mongo finished')
  },
  error => {
    console.error('🚨  mongo failed')
    console.error(error.stack)
  }
)

process.on('exit', () => {
  spawnPromise({
    script: `mongo admin --eval "db.shutdownServer()" --port ${mongoPort}`,
    message: '☠  shutting down mongodb',
  })
})

// this is not transpiled
/*
  eslint
  comma-dangle: [
    2,
    {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      functions: 'never'
    }
  ]
 */
