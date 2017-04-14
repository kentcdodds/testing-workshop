const path = require('path')
const {
  concurrent,
  series,
  runInNewWindow,
  crossEnv,
  rimraf,
  commonTags,
  ifWindows,
} = require('nps-utils')

const {oneLine} = commonTags

const hiddenFromHelp = true

const delay = s => ifWindows(`timeout ${s}`, `sleep ${s}`)
const ignoreOutput = s =>
  `echo ${s} && ${s} ${ifWindows('> NUL', '&>/dev/null')}`

const splitVerifyDescription = oneLine`
  This verifies that the final version actually passes the tests.
  To do this, we first use split-guide and place the final version
  in the place of the exercises, then we run the tests, then
  we re-run the split to have the exercises where they should be.
`

module.exports = {
  scripts: {
    default: {
      description: 'starts mongo, the API, and the client in production mode',
      script: concurrent.nps('mongo', 'api', 'client'),
    },
    separateStart: {
      hiddenFromHelp,
      description: 'Runs all the start scripts in individual terminals',
      script: series(
        runInNewWindow.nps('mongo'),
        runInNewWindow.nps('api'),
        runInNewWindow.nps('client')
      ),
    },
    mongo: {
      description: oneLine`
        Create the .mongo-db dir and start the mongod process.
        This also ignores all the output. If you want to see
        the output, then run: "npm start mongo.start" instead.
      `,
      script: series('mkdirp .mongo-db', ignoreOutput('nps mongo.start')),
      start: {
        description: oneLine`
          starts the mongodb server with the
          database pointing to ./mongo-db
        `,
        script: `mongod --dbpath "${path.join(__dirname, './.mongo-db')}"`,
      },
      stop: {
        description: 'stops the mongo server',
        script: 'mongo admin --eval "db.shutdownServer()"',
      },
    },
    api: {
      description: 'start the api server in production mode',
      script: series('cd api', 'npm start --silent'),
      test: {
        hiddenFromHelp,
        description: 'run the api unit and integration tests',
        script: concurrent.nps('api.test.unit', 'api.test.integration'),
        unit: {
          hiddenFromHelp,
          script: series('cd api', 'npm start test.unit --silent'),
        },
        integration: {
          hiddenFromHelp,
          script: oneLine`
            concurrently
            --kill-others
            --success first
            --prefix "[{name}]"
            --names dev.mongo,dev.api,api.test.integration
            "nps dev.mongo"
            "${delay(2)} && cd api && npm start --silent test.integration"
          `,
        },
      },
    },
    client: {
      description: 'start the production client server',
      script: series('cd client', 'npm start --silent -- "default 8080"'),
      test: {
        hiddenFromHelp,
        description: 'run the client tests',
        script: series('cd client', 'npm test --silent'),
      },
    },
    build: {
      default: {
        description: 'Build both the client and the api',
        script: concurrent.nps('build.api', 'build.client'),
      },
      api: {
        script: series('cd api', 'npm start build --silent'),
        description: 'run the api build',
      },
      client: {
        script: series('cd client', 'npm start build --silent'),
        description: 'run the client build',
      },
    },
    dev: {
      description: 'starts everything in dev mode',
      script: concurrent.nps('dev.mongo', 'dev.client', 'dev.api'),
      separate: {
        hiddenFromHelp,
        description: 'Runs all of the dev scripts in individual terminals',
        script: series(
          runInNewWindow.nps('dev.mongo --silent'),
          runInNewWindow.nps('npm start dev.client --silent'),
          runInNewWindow.nps('dev.api --silent')
        ),
      },
      // dev is the same as live for mongo for now...
      mongo: {
        description: oneLine`
          starts the dev-mode mongo server
          (same as production mode for now)
        `,
        script: 'npm start mongo --silent',
      },
      client: {
        description: 'starts the client server in dev mode',
        script: series('cd client', 'npm start dev --silent'),
      },
      api: {
        description: 'starts the api server in dev mode',
        script: series('cd api', 'npm start dev --silent'),
      },
    },
    e2e: getE2EScripts(),
    test: {
      description: 'run the api and client tests in parallel',
      script: concurrent.nps('api.test', 'client.test'),
    },
    lint: {
      hiddenFromHelp,
      script: 'eslint .',
      description: 'lint project files',
    },
    format: {
      hiddenFromHelp,
      script: 'prettier-eslint --write "api/**/*.js" "client/**/*.js"',
      description: 'autoformat project files',
    },
    validate: {
      description: 'validates that things are set up properly',
      script: concurrent.nps(
        'lint',
        'split.api.verify',
        'split.client.verify',
        'e2e'
      ),
    },
    split: {
      default: {
        script: concurrent.nps('split.api', 'split.client'),
        hiddenFromHelp,
      },
      verify: {
        script: concurrent.nps('split.api.verify', 'split.client.verify'),
        hiddenFromHelp,
      },
      client: {
        default: {
          script: series(
            rimraf('client-final'),
            oneLine`
              split-guide generate
              --no-clean
              --templates-dir templates/client
              --exercises-dir client
              --exercises-final-dir client-final
            `
          ),
          hiddenFromHelp,
        },
        verify: {
          hiddenFromHelp,
          description: splitVerifyDescription,
          script: series(
            rimraf('client-final', 'node_modules/.tmp/client'),
            oneLine`
              split-guide generate
              --no-clean
              --templates-dir templates/client
              --exercises-dir node_modules/.tmp/client
              --exercises-final-dir client
            `,
            'nps client.test',
            series('cd client', 'npm start demo', 'cd ..'),
            'nps split.client'
          ),
        },
      },
      api: {
        default: {
          script: series(
            rimraf('api-final'),
            oneLine`
              split-guide generate
              --no-clean
              --templates-dir templates/api
              --exercises-dir api
              --exercises-final-dir api-final
            `
          ),
          hiddenFromHelp,
        },
        verify: {
          hiddenFromHelp,
          description: splitVerifyDescription,
          script: series(
            rimraf('api-final', 'node_modules/.tmp/api'),
            oneLine`
              split-guide generate
              --no-clean
              --templates-dir templates/api
              --exercises-dir node_modules/.tmp/api
              --exercises-final-dir api
            `,
            'nps api.test',
            series('cd api', 'npm start demo', 'cd ..'),
            'nps split.api'
          ),
        },
      },
    },
    contributors: {
      add: {
        description: oneLine`
          Prompt to add a new contributor
          to the contributors table
        `,
        script: 'all-contributors add',
      },
      generate: {
        description: 'regenerates the contributors table',
        script: 'all-contributors generate',
      },
    },
  },
}

function getE2EScripts() {
  const allScripts = ['client', 'cypress', 'mongo', 'api']
  const cypresslessScripts = allScripts.filter(x => x !== 'cypress')
  const devMap = s => `"${crossEnv(`STDIO=inherit nps e2e.dev.${s}`)}"`
  const runMap = s => `"nps e2e.run.${s}"`

  const {run, dev} = allScripts.reduce(
    (runDev, scriptName) => {
      const script = `node ./scripts/e2e-${scriptName}`
      runDev.run[scriptName] = {
        script,
        hiddenFromHelp,
      }
      runDev.dev[scriptName] = {
        script: crossEnv(`E2E_DEV=true ${script}`),
        hiddenFromHelp,
      }
      return runDev
    },
    {run: {}, dev: {}}
  )
  const defaultScript = getDefaultScript(
    allScripts,
    runMap,
    '--kill-others --success first'
  )

  const loadDatabase = {
    script: crossEnv(
      oneLine`
        MONGO_PORT=27018
        MONGO_PATH=./.e2e/mongo-db
        MONGODB_URI="mongodb://localhost:27018/conduit"
        node ./scripts/load-database.js
      `
    ),
    hiddenFromHelp,
  }

  Object.assign(dev, {
    default: {
      description: 'Run the e2e services and cypress in dev mode.',
      script: getConcurrentScript(allScripts, devMap),
    },
    services: {
      hiddenFromHelp,
      description: oneLine`
        starts all the services.
        Use if you already have cypress running
      `,
      script: getConcurrentScript(cypresslessScripts, devMap),
    },
  })

  const noBuild = {
    script: getBuildessScript(
      allScripts,
      runMap,
      '--kill-others --success first'
    ),
    hiddenFromHelp,
  }

  return {
    default: {
      script: defaultScript,
      description: oneLine`
        Runs everything you need for a full E2E test run.
        Note that there are various combinations of these
        scripts which you can run. See the child scripts
        of e2e. Also note that if you specify the
        environment variable of \`STDIO=inherit\`, you will
        be able to see the output of services which could
        bet quite handy.
      `,
    },
    loadDatabase,
    run,
    dev,
    noBuild,
  }

  function getDefaultScript(scripts, prefix, flags = '') {
    const prepare = concurrent.nps('e2e.loadDatabase', 'build')
    return series(prepare, getConcurrentScript(scripts, prefix, flags))
  }

  function getBuildessScript(scripts, prefix, flags) {
    return series(
      'nps e2e.loadDatabase',
      getConcurrentScript(scripts, prefix, flags)
    )
  }

  function getConcurrentScript(scripts, map, flags = '') {
    const npsScripts = scripts.map(map)

    return oneLine`
      concurrently
      ${flags}
      --prefix-colors "bgGreen.bold,bgBlue.bold,bgMagenta.bold,bgCyan.bold"
      --prefix "[{name}]"
      --names "${scripts.join(',')}"
      ${npsScripts.join(' ')}
    `
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
