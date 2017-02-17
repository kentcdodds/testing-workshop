const spawn = require('spawn-command-with-kill')

console.log('spawning')
const mongodChild = spawn('npm start mongo --silent', {stdio: 'inherit'})

process.on('exit', cleanUp)
process.on('SIGINT', cleanUp)
process.on('uncaughtException', cleanUp)

setTimeout(spawnGenerate, 3000)

function spawnGenerate() {
  const babelNode = './node_modules/.bin/babel-node'
  const generateChild = spawn(`cd api && ${babelNode} scripts/generate`, {
    stdio: 'inherit',
  })
  generateChild.on('exit', cleanUp)
}

function cleanUp() {
  console.log('killing mongod process')
  mongodChild.kill()
  setTimeout(() => {
    // wait for mongo to die
  }, 1000)
}
