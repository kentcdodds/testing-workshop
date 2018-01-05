const path = require('path')

const here = p => path.join(__dirname, p)

module.exports = {
  testEnvironment: 'jest-environment-node',
  roots: [here('./integration')],
  setupTestFrameworkScriptFile: here('../other/jest/setup.js'),
  testPathIgnorePatterns: ['/helpers/', '/fixtures/'],
  // TODO: figure out code coverage reporting
  // collectCoverageFrom: ['**/src/**'],
  // coverageDirectory: here('../coverage/integration'),
  // coverageThreshold: {
  //   global: {
  //     statements: 0,
  //     branches: 0,
  //     functions: 0,
  //     lines: 0,
  //   },
  // },
}
