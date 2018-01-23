// ./client/jest.config.js
module.exports = {
  displayName: 'client',
  testPathIgnorePatterns: ['/node_modules/', '/helpers/'],
  setupFiles: ['<rootDir>/test/setup-tests.js'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
}
