module.exports = {
  coverageDirectory: '../coverage',
  collectCoverageFrom: [
    '**/src/**/*.js',
    '!**/__tests__/**',
    '!**/node_modules/**',
  ],
  projects: [
    './client',
    './server',
    './other/whats-a-mock',
    './other/setup-jest/calculator.solution',
  ],
}
