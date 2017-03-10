const path = require('path')
const spawn = require('spawn-command-with-kill')
const {
  clientServerPort,
  apiPort,
} = require('./e2e-shared')
const cwd = path.join(__dirname, '..')

const devMode = Boolean(JSON.parse(process.env.E2E_DEV || 'false'))
const apiUrl = `http://localhost:${apiPort}/api`
const clientUrl = `http://localhost:${clientServerPort}`
const cypressEnv = Object.assign({}, process.env, {
  CYPRESS_CLIENT_URL: clientUrl,
  CYPRESS_API_URL: apiUrl,
  CYPRESS_E2E_DEV: devMode,
})

const arg = devMode ? 'open' : 'run'
const cypressCommand = `./node_modules/.bin/cypress ${arg}`
const cypressChild = spawn(cypressCommand, {
  cwd,
  env: cypressEnv,
  stdio: 'inherit',
})
process.on('exit', () => {
  if (cypressChild && !devMode) {
    console.log('☠  shutting down cypress')
    cypressChild.kill()
  } else if (devMode) {
    console.log(`👍  cypress should have started. You're good to go.`)
  }
})
