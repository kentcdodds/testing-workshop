/* eslint-disable */
const path = require('path')
const installDeps = require('./workshop-setup').installDeps

require('./ensure-symlinks')

const main = path.resolve(__dirname, '..')
const shared = path.resolve(__dirname, '../shared')
const server = path.resolve(__dirname, '../server')
const client = path.resolve(__dirname, '../client')

installDeps([main, shared, server, client]).then(
  () => {
    console.log('👍  all dependencies installed')
  },
  () => {
    // ignore, workshop-setup will log for us...
  },
)
