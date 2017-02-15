const path = require('path')
const isWindows = require('is-windows')()
const mongodBin = isWindows ?
  `"C:/Program Files/MongoDb/Server/3.2/bin/mongod.exe"` :
  'mongod'
const dbPath = path.join(__dirname, './.mongo-db')
const mongoDesc = [
  'Create the .mongo-db directory and start the mongod process.',
  ifWindows(' If this fails, try updating mongodBin in package-scripts.js'),
].join('')

module.exports = {
  scripts: {
    mongo: {
      script: series([
        'mkdirp .mongo-db',
        `${mongodBin} --dbpath ${dbPath} --quiet`,
      ]),
      description: mongoDesc,
    },
    server: {
      script: series(['cd api', 'npm start']),
      description: 'start the api server',
    },
    client: {
      script: series(['cd client', 'cross-env PORT=8080 npm start']),
      description: 'start the client dev server',
    },
    lint: {
      script: 'eslint api/ client/',
      description: 'lint project files',
    },
    format: {
      script: 'prettier-eslint --write "api/**/*.js" "client/**/*.js"',
      description: 'autoformat project files',
    },
    validate: {
      script: concurrent({
        lint: {
          script: 'nps lint',
          color: 'bgBlack.bold',
        },
      }),
      description: 'validates that things are set up properly',
    },
  },
}

function ifWindows(windowsVale, altValue = '') {
  return isWindows ? windowsVale : altValue
}

function concurrent(scripts) {
  const {
    colors,
    scripts: quotedScripts,
    names,
  } = Object.keys(scripts).reduce(reduceScripts, {
    colors: '',
    scripts: '',
    names: '',
  })
  const flags = [
    '--kil-others',
    `--prefix-colors "${colors}"`,
    '--prefix "[{name}]"',
    `--names "${names}"`,
    quotedScripts,
  ]
  return `concurrently ${flags.join(' ')}`

  function reduceScripts(accumulator, scriptName, index) {
    const prefix = index === 0 ? '' : ','
    const {script, color} = scripts[scriptName]
    accumulator.names += `${prefix}${scriptName}`
    accumulator.colors += `${prefix}${color}`
    accumulator.scripts += ` "${script}"`
    return accumulator
  }
}

function series(scripts) {
  return scripts.join(' && ')
}

function install(dir = '') {
  return `node ./scripts/install ${dir}`
}
