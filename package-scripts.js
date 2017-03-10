const path = require('path')
const {
  concurrent,
  series,
  runInNewWindow,
  crossEnv,
  commonTags,
} = require('nps-utils')

const {oneLine} = commonTags

module.exports = {
  scripts: {
    default: {
      script: series(
        runInNewWindow('npm start mongo --silent'),
        runInNewWindow('npm start api --silent'),
        runInNewWindow('npm start client --silent')
      ),
    },
    mongo: {
      script: series(
        'mkdirp .mongo-db',
        `mongod --dbpath ${path.join(__dirname, './.mongo-db')} --quiet`
      ),
      description: 'Create the .mongo-db dir and start the mongod process',
      stop: 'mongo admin --eval "db.shutdownServer()"',
    },
    api: {
      script: series('cd api', 'npm start --silent'),
      description: 'start the api server',
      test: {
        script: series('cd api', 'npm test --silent'),
        description: 'run the api tests',
      },
    },
    client: {
      script: series('cd client', 'npm start --silent -- 8080'),
      description: 'start the client dev server',
      test: {
        script: series('cd client', 'npm test --silent'),
        description: 'run the client tests',
      },
    },
    build: {
      default: concurrent.nps('build.api', 'build.client'),
      api: series('cd api', 'npm start build --silent'),
      client: series('cd client', 'npm start build --silent'),
    },
    dev: {
      script: series(
        runInNewWindow.nps('dev.mongo --silent'),
        runInNewWindow(crossEnv('PORT=8080 npm start dev.client --silent')),
        runInNewWindow.nps('dev.api --silent')
      ),
      description: 'starts everything in dev mode',
      // dev is the same as live for mongo for now...
      mongo: 'npm start mongo --silent',
      client: series('cd client', 'npm start dev --silent'),
      api: series('cd api', 'npm start dev --silent'),
    },
    e2e: getE2EScripts(),
    test: {
      description: 'run the tests in parallel',
      script: concurrent.nps('api.tests', 'client.tests'),
    },
    lint: {
      script: 'eslint .',
      description: 'lint project files',
    },
    format: {
      script: 'prettier-eslint --write "api/**/*.js" "client/**/*.js"',
      description: 'autoformat project files',
    },
    validate: {
      script: concurrent.nps(
        'build.api',
        'build.client',
        'lint',
        'api.test',
        'client.test',
        'e2e'
      ),
      description: 'validates that things are set up properly',
    },
    addContributor: {
      description: 'Prompt to add a new contributor to the contributors table',
      script: 'all-contributors add',
    },
    generateContributors: {
      description: 'regenerates the contributors table',
      script: 'all-contributors generate',
    },
  },
}

function getE2EScripts() {
  const allScripts = ['client', 'cypress', 'mongo', 'api']
  const cypresslessStarts = allScripts.filter(x => x !== 'cypress')

  const {start, dev} = allScripts.reduce(
    (startDev, scriptName) => {
      const script = `node ./scripts/e2e-${scriptName}`
      startDev.start[scriptName] = script
      startDev.dev[scriptName] = crossEnv(`E2E_DEV=true ${script}`)
      return startDev
    },
    {start: {}, dev: {}}
  )
  const defaultScript = getDefaultScript(
    allScripts,
    'start',
    '--kill-others --success first'
  )

  const loadDatabase = crossEnv(
    oneLine`
      MONGO_PORT=27018
      MONGO_PATH=./.e2e/mongo-db
      MONGODB_URI="mongodb://localhost:27018/conduit"
      node ./scripts/load-database.js
    `
  )

  Object.assign(dev, {
    default: getDefaultScript(allScripts, 'dev'),
    services: {
      description: oneLine`
        starts all the services.
        Use if you already have cypress running
      `,
      script: getDefaultScript(cypresslessStarts, 'dev'),
    },
  })

  return {script: defaultScript, loadDatabase, start, dev}

  function getDefaultScript(scripts, prefix, flags = '') {
    const npsScripts = scripts.map(s => `"nps e2e.${prefix}.${s}"`)

    const prepare = concurrent.nps('e2e.loadDatabase', 'build')

    return series(
      prepare,
      oneLine`
        concurrently
        ${flags}
        --prefix-colors "bgGreen.bold,bgBlue.bold,bgMagenta.bold,bgCyan.bold"
        --prefix "[{name}]"
        --names "${scripts.join(',')}"
        ${npsScripts.join(' ')}
      `
    )
  }
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
