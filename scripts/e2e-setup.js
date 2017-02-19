const path = require('path')
const spawn = require('spawn-command-with-kill')
const pSeries = require('p-series')
const {
  servicesReadyMessage,
  clientServerPort,
  apiPort,
} = require('./e2e-shared')

const cwd = path.join(__dirname, '..')
const clientCwd = path.join(cwd, 'client')
const apiCwd = path.join(cwd, 'api')

const dbPath = path.join(cwd, '.e2e/mongo-db')
const mongoPort = 27018
const mongoUri = `mongodb://localhost:${mongoPort}/conduit`

const mongoEnv = Object.assign({}, process.env, {MONGODB_URI: mongoUri})
const apiEnv = Object.assign({}, process.env, {
  MONGODB_URI: mongoUri,
  MONGOD_DEBUG: true,
  PORT: apiPort,
})

// create mongo db folder
const createMongoDbDirectoryCommand = {
  script: `./node_modules/.bin/mkdirp ${dbPath}`,
  message: '📂  creating dbpath',
}
// start e2e mongo
const startMongoCommand = {
  script: `mongod --dbpath ${dbPath} --port ${mongoPort}`,
  resolveEarly: true,
  resolveDelay: 1000,
  message: '🔑  starting mongodb',
}
// load e2e mongo with data
const loadDataCommand = {
  script: `cd api && npm run generateData --silent`,
  message: '⤵️  loading data into mongodb',
}
// build app server
const buildApiCommand = {
  script: `npm run build --silent`,
  message: '🔨  running api build',
}
// start app server
const startApiCommand = {
  script: `npm start --silent`,
  resolveEarly: true,
  resolveDelay: 500,
  message: '🔑  starting api server',
}
// build client
const buildClientCommand = {
  script: `npm run build --silent`,
  message: '🔨  running client build',
}
// start (built) client http-server
const startClientCommand = {
  script: `npm start --silent -- ${clientServerPort}`,
  resolveEarly: true,
  resolveDelay: 500,
  message: '🔑  string client server',
}
// cleanup: kill app server, client server, mongo

const mongoSequence = [
  createMongoDbDirectoryCommand,
  startMongoCommand,
  loadDataCommand,
]
const apiSequence = [buildApiCommand, startApiCommand]
const clientSequence = [buildClientCommand, startClientCommand]

// const stdio = 'inherit'
const stdio = 'pipe'
const mongoPromise = runSequence(mongoSequence, {
  cwd,
  stdio,
  env: mongoEnv,
})
const apiPromise = runSequence(apiSequence, {
  cwd: apiCwd,
  stdio,
  env: apiEnv,
})
const clientPromise = runSequence(clientSequence, {
  cwd: clientCwd,
  stdio,
})

Promise.all([mongoPromise, apiPromise, clientPromise]).then(results => {
  const fakeKillable = {
    kill() {
      console.log('needed to use fake kill')
    },
  }
  const {
    1: {children: {1: apiChild = fakeKillable}},
    2: {children: {1: clientChild = fakeKillable}},
  } = results
  console.log(servicesReadyMessage)
  console.log('🚫  To close, just hit Ctrl+C')
  process.on('exit', () => {
    Promise.resolve().then(cleanUp).then(() => {
      console.log('🎉  shut down successful')
    }, error => {
      console.error('🚨  There was an error shutting services down...')
      console.error(error)
    })
  })

  function cleanUp() {
    console.log('☠  shutting down client server')
    console.log('☠  shutting down api server')
    clientChild.kill()
    apiChild.kill()
    const {promise: killMongoPromise} = spawnPromise({
      script: `mongo admin --eval "db.shutdownServer()" --port ${mongoPort}`,
      message: '☠  shutting down mongodb',
    })
    return killMongoPromise
  }
})

function runSequence(commands, ...spawnArgs) {
  return new Promise((resolve, reject) => {
    const children = []
    pSeries(
      commands.map(command => () => {
        const {promise, child} = spawnPromise(command, ...spawnArgs)
        children.push(child)
        return promise
      })
    )
      .then(result => {
        resolve({result, children})
      })
      .catch(error => {
        reject({error, children})
      })
  })
}

function spawnPromise({script, resolveEarly, resolveDelay, message}, ...args) {
  console.log(`${message}:`, script)
  const child = spawn(script, ...args)
  const promise = new Promise((resolve, reject) => {
    if (resolveEarly) {
      setTimeout(resolve, resolveDelay)
    } else {
      let rejected = false
      child.on('exit', exitCode => {
        if (!rejected) {
          if (exitCode === 0) {
            resolve()
          } else {
            rejected = true
            reject(exitCode)
          }
        }
      })
      child.on('error', error => {
        rejected = true
        reject(error)
      })
    }
  })
  return {child, promise}
}

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
