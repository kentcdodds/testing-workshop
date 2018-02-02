/* eslint-disable */

const path = require('path')
const fs = require('fs')

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
