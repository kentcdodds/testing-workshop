const path = require('path')
const isWindows = require('is-windows')()
const mongodBin = isWindows ? `"C:/Program Files/MongoDb/Server/3.2/bin/mongod.exe"` : 'mongod'
const dbPath = path.join(__dirname, './.mongo-db')
const mongoDesc = `Create the .mongo-db directory and start the mongod process.${ifWindows(
  ' If this fails for you, try updating the mongodBin path in package-scripts.js'
)}`

module.exports = {
  scripts: {
    mongo: {
      script: [
        'mkdirp .mongo-db',
        `${mongodBin} --dbpath ${dbPath} --quiet`,
      ].join(' && '),
      description: mongoDesc,
    },
    server: {
      script: [
        'cd api',
        'npm start',
      ].join(' && '),
      description: 'start the api server',
    },
    client: {
      script: [
        'cd client',
        'cross-env PORT=8080 npm start',
      ].join(' && '),
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
  }
}

function ifWindows(windowsVale, altValue = '') {
  return isWindows ? windowsVale : altValue
}
