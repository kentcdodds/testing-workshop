const spawn = require('spawn-command-with-kill')

const stopMongo = 'npm start mongo.stop'
console.log(`stopping mongod with "${stopMongo}" (in case it is running)`)
const stopMongoChild = spawn(stopMongo, {stdio: 'ignore'})

stopMongoChild.on('exit', () => {
  const startMongo = 'npm start mongo'
  console.log(`starting mongod with "${startMongo}"`)
  const mongodChild = spawn(startMongo, {stdio: 'ignore'})
  let killed = false

  process.on('exit', cleanUp)
  process.on('SIGINT', cleanUp)
  process.on('uncaughtException', cleanUp)

  setTimeout(spawnGenerate, 3000)

  function spawnGenerate() {
    const babelNode = './node_modules/.bin/babel-node'
    const generateCommand = `cd api && ${babelNode} scripts/generate`
    console.log(`generating and inserting data with "${generateCommand}"`)
    const generateChild = spawn(generateCommand, {
      stdio: 'inherit',
    })
    generateChild.on('exit', cleanUp)
  }
  
  function cleanUp() {
    if (!killed) {
      killed = true
      console.log('killing mongod process')
      mongodChild.kill()
      setTimeout(() => {
        // wait for mongo to die
      }, 1000)
    }
  }
})


