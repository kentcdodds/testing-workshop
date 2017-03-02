const path = require('path')
const {oneLine} = require('common-tags')
const {concurrent, series, runInNewWindow} = require('nps-utils')

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
      api: series('cd api', 'npm run build --silent'),
      client: series('cd client', 'npm run build --silent'),
    },
    dev: {
      script: series(
        runInNewWindow.nps('dev.mongo --silent'),
        runInNewWindow(
          oneLine`
            ./node_modules/.bin/cross-env PORT=8080
            npm start dev.client --silent
          `
        ),
        runInNewWindow.nps('dev.api --silent')
      ),
      description: 'starts everything in dev mode',
      // dev is the same as live for mongo for now...
      mongo: 'npm start mongo --silent',
      client: series('cd client', 'npm run dev --silent'),
      api: series('cd api', 'npm run dev --silent'),
    },
    e2e: {
      script: 'node scripts/e2e.js',
      dev: {
        script: 'cross-env E2E_DEV=true node scripts/e2e.js',
      },
    },
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
        'client.test'
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
