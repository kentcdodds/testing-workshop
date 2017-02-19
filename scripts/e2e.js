const path = require('path')
const spawn = require('spawn-command-with-kill')
const {stripIndent} = require('common-tags')
const {
  servicesReadyMessage,
  clientServerPort,
  apiPort,
} = require('./e2e-shared')
const cwd = path.join(__dirname, '..')

const devMode = Boolean(JSON.parse(process.env.E2E_DEV || 'false'))

if (devMode) {
  console.log(stripIndent`
    E2E dev mode enabled.
    This means we'll do the following:
      1. Start application services
      2. Start the Cypress App (GUI)
    You'll have to:
      1. Close the Cypress App
      2. Close the application services (Ctrl+C)
  `)
}

const apiUrl = `http://localhost:${apiPort}/api`
const clientUrl = `http://localhost:${clientServerPort}`
const cypressEnv = Object.assign({}, process.env, {
  CYPRESS_APP_URL: `${clientUrl}?api-url=${encodeURIComponent(apiUrl)}`,
})

let cypressChild
const setupCommand = 'node scripts/e2e-setup'
const setupEnv = Object.assign({}, process.env, {FORCE_COLOR: true})
const setupChild = spawn(setupCommand, {cwd, env: setupEnv})

let setupShutdown = false

setupChild.stdout.on('data', data => {
  const line = data.toString()
  process.stdout.write(line)
  if (String(line).includes(servicesReadyMessage)) {
    startCypress()
  }
})

process.on('exit', () => {
  if (cypressChild) {
    console.log('☠  shutting down cypress')
    cypressChild.kill()
  }
  shutdownServices()
})

function startCypress() {
  const arg = devMode ? 'open' : 'run'
  const cypressCommand = `./node_modules/.bin/cypress ${arg}`
  cypressChild = spawn(cypressCommand, {
    cwd,
    env: cypressEnv,
    stdio: 'inherit',
  })
  if (!devMode) {
    cypressChild.on('exit', shutdownServices)
  }
}

function shutdownServices() {
  if (!setupShutdown) {
    setupShutdown = true
    console.log('☠  shutting down application services')
    setupChild.kill()
  }
}
