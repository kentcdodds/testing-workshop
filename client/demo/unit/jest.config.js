const path = require('path')

const here = p => path.join(__dirname, p)

module.exports = {
  setupFiles: [here('../../config/jest/setup-tests.js')],
  setupTestFrameworkScriptFile: here('../../config/jest/setup-framework.js'),
  testEnvironment: 'jest-environment-jsdom',
  roots: [__dirname],
  testPathIgnorePatterns: ['/helpers/'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
}
