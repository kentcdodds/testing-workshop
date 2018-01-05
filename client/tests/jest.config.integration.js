const path = require('path')

const here = p => path.join(__dirname, p)

module.exports = {
  roots: [here('./integration')],
  setupFiles: [here('../config/jest/setup-tests.js')],
  setupTestFrameworkScriptFile: here('../config/jest/setup-framework.js'),
  testRegex: 'tests/integration/.*.js$',
  testPathIgnorePatterns: ['/node_modules/', '__mocks__', 'helpers'],
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.js$': here('../node_modules/babel-jest'),
    '^.+\\.css$': here('../config/jest/cssTransform.js'),
    '^(?!.*\\.(js|css|json)$)': here('../config/jest/fileTransform.js'),
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.js$'],
  // TODO: make coverage work
  // collectCoverageFrom: ['src/**/*.js'],
  // coverageThreshold: {
  //   global: {
  //     statements: 2,
  //     branches: 2,
  //     functions: 2,
  //     lines: 2,
  //   },
  // },
  // coverageDirectory: 'coverage/integration',
  snapshotSerializers: ['enzyme-to-json/serializer', 'jest-glamor-react'],
}
