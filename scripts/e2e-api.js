const path = require('path')
const {
  apiPort,
  spawnPromise,
} = require('./e2e-shared')

const devMode = Boolean(JSON.parse(process.env.E2E_DEV || 'false'))

const serviceStartScriptName = devMode ? 'dev' : ''

const cwd = path.join(__dirname, '..')
const apiCwd = path.join(cwd, 'api')

const mongoPort = 27018
const mongoUri = `mongodb://localhost:${mongoPort}/conduit`

// start app server
const startApiCommand = {
  script: `npm start ${serviceStartScriptName} --silent`,
  message: '🔑  starting api server',
}

const stdio = process.env.STDIO || ['pipe', 'pipe', process.stderr]
spawnPromise(startApiCommand, {
  cwd: apiCwd,
  stdio,
  env: Object.assign({}, process.env, {
    MONGODB_URI: mongoUri,
    MONGOD_DEBUG: true,
    PORT: apiPort,
  }),
}).promise.then(() => {
  console.log('🏁  api finished')
}, error => {
  console.error('🚨  api failed')
  console.error(error.stack)
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
