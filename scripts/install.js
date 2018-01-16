/* eslint-disable */

var path = require('path')
var installDeps = require('./workshop-setup').installDeps

var main = path.resolve(__dirname, '..')
var server = path.resolve(__dirname, '../server')
var client = path.resolve(__dirname, '../client')
installDeps([main, server, client]).then(
  () => {
    console.log('👍  all dependencies installed')
  },
  () => {
    // ignore, workshop-setup will log for us...
  }
)
