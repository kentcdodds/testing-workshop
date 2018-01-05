module.exports = {
  testEnvironment: 'jest-environment-node',
  setupTestFrameworkScriptFile: require.resolve('../../other/jest/setup.js'),
  roots: [__dirname],
}
