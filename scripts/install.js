var path = require('path')
var installDeps = require('./workshop-setup').installDeps

var main = path.resolve(__dirname, '..')
var api = path.resolve(__dirname, '../api')
var client = path.resolve(__dirname, '../client')
installDeps([main, api, client]).then(() => {
  console.log('👍  all dependencies installed')
}, () => {
  // ignore, workshop-setup will log for us...
})
