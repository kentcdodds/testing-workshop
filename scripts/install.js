/* eslint-disable */

const path = require('path')
const fs = require('fs')
const installDeps = require('./workshop-setup').installDeps

ensureExists(path.resolve(__dirname, '../client/other'))
ensureExists(path.resolve(__dirname, '../server/other'))

symlinkDir(
  path.resolve(__dirname, '../shared/'),
  path.resolve(__dirname, '../client/other/shared')
)
symlinkDir(
  path.resolve(__dirname, '../shared/'),
  path.resolve(__dirname, '../server/other/shared')
)

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

function symlinkDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.symlinkSync(src, dest, 'dir')
  }
}

function ensureExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
}
