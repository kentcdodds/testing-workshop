/* eslint-disable */

var path = require('path')
var installDeps = require('./workshop-setup').installDeps

var main = path.resolve(__dirname, '..')
var shared = path.resolve(__dirname, '../shared')
var server = path.resolve(__dirname, '../server')
var client = path.resolve(__dirname, '../client')
installDeps([main, shared, server, client]).then(
  function() {
    console.log('👍  all dependencies installed')
  },
  function() {
    // ignore, workshop-setup will log for us...
  }
)
