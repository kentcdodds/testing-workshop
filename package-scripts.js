const path = require('path')
const isWindows = require('is-windows')()
const {oneLine} = require('common-tags')

const concurrentTests = {
  'api-tests': {
    script: 'nps api.test',
    color: 'bgCyan.bold.dim',
  },
  'client-tests': {
    script: 'nps client.test',
    color: 'black.bgYellow.bold.dim',
  },
}

const concurrentBuild = {
  'api-build': {
    script: 'nps build.api',
    color: 'bgGreen.bold.dim',
  },
  'client-build': {
    script: 'nps build.client',
    color: 'bgRed.bold.dim',
  },
}

module.exports = {
  scripts: {
    default: {
      script: series([
        startInNewWindow('npm start mongo --silent'),
        startInNewWindow('npm start api --silent'),
        startInNewWindow('npm start client --silent'),
      ]),
    },
    mongo: {
      script: series([
        'mkdirp .mongo-db',
        `mongod --dbpath ${path.join(__dirname, './.mongo-db')} --quiet`,
      ]),
      description: 'Create the .mongo-db dir and start the mongod process',
      stop: 'mongo admin --eval "db.shutdownServer()"',
    },
    api: {
      script: series(['cd api', 'npm start --silent']),
      description: 'start the api server',
      test: {
        script: series(['cd api', 'npm test --silent']),
        description: 'run the api tests',
      },
    },
    client: {
      script: series(['cd client', 'npm start --silent -- 8080']),
      description: 'start the client dev server',
      test: {
        script: series(['cd client', 'npm test --silent']),
        description: 'run the client tests',
      },
    },
    build: {
      default: concurrent(concurrentBuild),
      api: series(['cd api', 'npm run build --silent']),
      client: series(['cd client', 'npm run build --silent']),
    },
    dev: {
      script: series([
        startInNewWindow('npm start dev.mongo --silent'),
        startInNewWindow(
          oneLine`
          ./node_modules/.bin/cross-env PORT=8080
          npm start dev.client --silent`
        ),
        startInNewWindow('npm start dev.api --silent'),
      ]),
      description: 'starts everything in dev mode',
      // dev is the same as live for mongo for now...
      mongo: 'npm start mongo --silent',
      client: series(['cd client', 'npm run dev --silent']),
      api: series(['cd api', 'npm run dev --silent']),
    },
    e2e: {
      script: 'node scripts/e2e.js',
      dev: {
        script: 'cross-env E2E_DEV=true node scripts/e2e.js',
      },
    },
    test: {
      description: 'run the tests in parallel',
      script: concurrent(concurrentTests),
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
      script: concurrent(
        Object.assign(
          {
            lint: {
              script: 'nps lint',
              color: 'bgBlack.bold',
            },
          },
          concurrentBuild,
          concurrentTests
        )
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

function concurrent(scripts) {
  const {
    colors,
    scripts: quotedScripts,
    names,
  } = Object.keys(scripts).reduce(reduceScripts, {
    colors: [],
    scripts: [],
    names: [],
  })
  const flags = [
    // https://github.com/kimmobrunfeldt/concurrently/issues/91
    // '--kill-others',
    `--prefix-colors "${colors.join(',')}"`,
    '--prefix "[{name}]"',
    `--names "${names.join(',')}"`,
    quotedScripts.join(' '),
  ]
  return `concurrently ${flags.join(' ')}`

  function reduceScripts(accumulator, scriptName) {
    const {script, color} = scripts[scriptName]
    accumulator.names.push(scriptName)
    accumulator.colors.push(color)
    accumulator.scripts.push(`"${script}"`)
    return accumulator
  }
}

function series(scripts) {
  return scripts.join(' && ')
}

function startInNewWindow(command) {
  return isWindows ?
    `start cmd /k "cd ${__dirname} && ${command}"` :
    [
      `osascript`,
      `-e 'tell application "Terminal"'`,
      `-e 'tell application "System Events" to keystroke "t" using {command down}'`, // eslint-disable-line max-len
      `-e 'do script "cd ${__dirname} && ${command}" in front window'`,
      `-e 'end tell'`,
    ].join(' ')
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
