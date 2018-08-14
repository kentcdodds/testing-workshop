// ./client/jest.config.js
module.exports = {
  displayName: 'client',
  testURL: 'https://til.test.com',
  testPathIgnorePatterns: ['/node_modules/', '/helpers/'],
  setupTestFrameworkScriptFile: require.resolve(
    './test/setup-test-framework.js',
  ),
  modulePaths: ['<rootDir>/src', '<rootDir>/test'],
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/test/svg-file-mock.js',
  },
}
