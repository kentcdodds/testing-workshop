// ./client/jest.config.js
module.exports = {
  displayName: 'client',
  testEnvironmentOptions: {
    url: 'https://til.test.com',
  },
  testPathIgnorePatterns: ['/node_modules/', '/helpers/'],
  setupFiles: ['<rootDir>/test/setup-tests.js'],
  modulePaths: ['<rootDir>/src', '<rootDir>/test'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
}
