const path = require('path')
const isWindows = require('is-windows')()

const concurrentTests = {
  'api-tests': {
    script: 'nps api.test',
    color: 'bgCyan.bold.dim',
  },
  'client-tests': {
    script: 'nps client.test',
    color: 'black.bgYellow.bold.dim',
  },
  'e2e-tests': {
    script: 'nps e2e',
    color: 'bgGreen.bold.dim',
  },
}

module.exports = {
  scripts: {
    default: {
      script: series([
        startInNewWindow('npm start mongo'),
        startInNewWindow('npm start api'),
        startInNewWindow('npm start client'),
      ]),
    },
    mongo: {
      script: series([
        'mkdirp .mongo-db',
        `mongod --dbpath ${path.join(__dirname, './.mongo-db')} --quiet`,
      ]),
      description: 'Create the .mongo-db dir and start the mongod process',
    },
    api: {
      script: series(['cd api', 'npm start']),
      description: 'start the api server',
      test: {
        script: series(['cd api', 'npm test']),
        description: 'run the api tests',
      },
    },
    client: {
      script: series(['cd client', 'cross-env PORT=8080 npm start']),
      description: 'start the client dev server',
      test: {
        script: series(['cd client', 'npm test']),
        description: 'run the client tests',
      },
    },
    e2e: {
      script: 'cross-env MOCHA_COLORS=true cypress run',
      description: 'run the E2E tests',
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
    '--kil-others',
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
    `start cmd.exe @cmd \\k "cd ${__dirname} && ${command}"` :
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
