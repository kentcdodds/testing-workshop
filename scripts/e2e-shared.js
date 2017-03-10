const spawn = require('spawn-command-with-kill')
const pSeries = require('p-series')

module.exports = {
  servicesReadyMessage: '🔑  Services ready for cypress testing!',
  clientServerPort: 9001,
  apiPort: 3001,
  runSequence,
  spawnPromise,
}


function runSequence(commands, ...spawnArgs) {
  return new Promise((resolve, reject) => {
    const children = []
    pSeries(
      commands.map(command => () => {
        const {promise, child} = spawnPromise(command, ...spawnArgs)
        children.push(child)
        return promise
      })
    )
      .then(result => {
        resolve({result, children})
      })
      .catch(error => {
        reject({error, children})
      })
  })
}

function spawnPromise({script, resolveEarly, resolveDelay, message}, ...args) {
  console.log(`${message}:`, script)
  const child = spawn(script, ...args)
  const promise = new Promise((resolve, reject) => {
    if (resolveEarly) {
      setTimeout(resolve, resolveDelay)
    } else {
      let rejected = false
      child.on('exit', exitCode => {
        if (!rejected) {
          if (exitCode === 0) {
            resolve()
          } else {
            rejected = true
            reject(exitCode)
          }
        }
      })
      child.on('error', error => {
        rejected = true
        reject(error)
      })
    }
  })
  return {child, promise}
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
