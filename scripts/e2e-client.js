const path = require('path')
const {spawnPromise, clientServerPort} = require('./e2e-shared')

const devMode = Boolean(JSON.parse(process.env.E2E_DEV || 'false'))

const serviceStartScriptName = devMode ? 'dev' : ''

const cwd = path.join(__dirname, '..')
const clientCwd = path.join(cwd, 'client')

const startClientCommand = {
  script: `npm start ${serviceStartScriptName} --silent`,
  message: '🔑  starting client server',
}

const stdio = process.env.STDIO || ['pipe', 'pipe', process.stderr]
spawnPromise(startClientCommand, {
  cwd: clientCwd,
  stdio,
  env: Object.assign({}, process.env, {
    PORT: clientServerPort,
    BROWSER: 'none', // so react-scripts doesn't auto-open a browser window
  }),
}).promise.then(
  () => {
    console.log('🏁  client finished')
  },
  error => {
    console.error('🚨  client failed')
    console.error(error.stack)
  },
)
