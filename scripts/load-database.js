const path = require('path')
const mkdirp = require('mkdirp')
const spawn = require('spawn-command-with-kill')
const {oneLine} = require('common-tags')
const isWindows = require('is-windows')

const ignoreOutput = isWindows() ? '> NUL' : '&>/dev/null'
const mongoPort = process.env.MONGO_PORT || '27017'
const mongoPath = process.env.MONGO_PATH ||
  path.join(__dirname, '../.mongo-db')

const stopMongo = oneLine`
  mongo admin
  --eval "db.shutdownServer()"
  --port ${mongoPort}
  ${ignoreOutput}
`
console.log(`stopping mongod with \`${stopMongo}\` (in case it is running)`)
const stopMongoChild = spawn(stopMongo, {stdio: 'inherit'})

stopMongoChild.on('exit', () => {
  mkdirp(mongoPath, err => {
    if (err) {
      throw err
    }

    const startMongo = oneLine`
      mongod
      --dbpath ${mongoPath}
      --port ${mongoPort}
      ${ignoreOutput}
    `
    console.log(`starting mongod with \`${startMongo}\``)
    spawn(startMongo, {stdio: 'inherit'})
    let stopped = false

    process.on('exit', cleanUp)
    process.on('SIGINT', cleanUp)
    process.on('uncaughtException', cleanUp)

    setTimeout(spawnGenerate, 5000)

    function spawnGenerate() {
      const babelNode = './node_modules/.bin/babel-node'
      const generateCommand = `cd api && ${babelNode} scripts/generate`
      console.log(`generating and inserting data with \`${generateCommand}\``)
      const generateChild = spawn(generateCommand, {
        stdio: 'inherit',
      })
      generateChild.on('exit', cleanUp)
    }

    function cleanUp() {
      if (!stopped) {
        stopped = true
        console.log(`stopping mongod process with \`${stopMongo}\``)
        spawn(stopMongo)
      }
    }
  })
})
