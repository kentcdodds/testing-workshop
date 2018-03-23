/* eslint-disable */
const path = require('path')
const installDeps = require('./workshop-setup').installDeps

installDeps([
  path.resolve(__dirname, '..'),
  path.resolve(__dirname, '../shared'),
  path.resolve(__dirname, '../server'),
  path.resolve(__dirname, '../client'),
  path.resolve(__dirname, '../other/configuration/calculator'),
  path.resolve(__dirname, '../other/configuration/calculator.solution'),
]).then(
  () => {
    console.log('👍  all dependencies installed')
  },
  () => {
    // ignore, workshop-setup will log for us...
  },
)
