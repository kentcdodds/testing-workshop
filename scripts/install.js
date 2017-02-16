// this file needs to be able to run
// in older versions of node
var cp = require('child_process')
var path = require('path')

var installer, args
try {
  !!cp.execSync('yarn --version')
  // yay! No error! Yarn's available!
  installer = 'yarn'
  args = []
} catch (e) {
  // use npm instead :-(
  installer = 'npm'
  args = ['install']
}

console.log('\n📦  Installing dependencies via ' + installer + ' ' + args.join(' '))

var main = path.resolve(__dirname, '..')
var api = path.resolve(__dirname, '../api')
var client = path.resolve(__dirname, '../client')
spawnInstall(main)
spawnInstall(api)
spawnInstall(client)

var finishedCount = 0

function spawnInstall(cwd) {
  console.log('🔑  starting install in ' + cwd)
  var child = cp.spawn(installer, args, {stdio: 'inherit', shell: true, cwd: cwd})
  child.on('close', onFinished)

  function onFinished() {
    console.log('finished installing dependencies in "' + cwd + '" 🎉')
    finishedCount++
    if (finishedCount < 3) {
      return
    }
    console.log('all dependencies have been installed')
  }
}
