const path = require('path')

const here = p => path.join(__dirname, p)

module.exports = {
  testEnvironment: 'jest-environment-node',
  roots: [here('../src')],
  setupTestFrameworkScriptFile: here('../other/jest/setup.js'),
  testPathIgnorePatterns: ['/helpers/', '/fixtures/'],
  // TODO: figure out code coverage reporting
  // collectCoverageFrom: ['**/*.js'],
  // coverageDirectory: here('../coverage/unit'),
  // coverageThreshold: {
  //   global: {
  //     statements: 0,
  //     branches: 0,
  //     functions: 0,
  //     lines: 0,
  //   },
  // },
}
