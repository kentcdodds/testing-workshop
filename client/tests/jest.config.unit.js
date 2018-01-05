const path = require('path')

const here = p => path.join(__dirname, p)

module.exports = {
  roots: [here('../src')],
  setupFiles: [here('../config/jest/setup-tests.js')],
  setupTestFrameworkScriptFile: here('../config/jest/setup-framework.js'),
  testRegex: 'src/.*__tests__/.*.js$',
  testPathIgnorePatterns: ['/node_modules/', '__mocks__', 'helpers'],
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.js$': here('../node_modules/babel-jest'),
    '^.+\\.css$': here('../config/jest/cssTransform.js'),
    '^(?!.*\\.(js|css|json)$)': here('../config/jest/fileTransform.js'),
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.js$'],
  // TODO: make coverage work
  // collectCoverageFrom: ['src/**'],
  // coverageThreshold: {
  //   global: {
  //     statements: 2,
  //     branches: 0.5,
  //     functions: 1,
  //     lines: 2,
  //   },
  // },
  // coverageDirectory: 'coverage/unit',
  snapshotSerializers: ['enzyme-to-json/serializer', 'jest-glamor-react'],
}
