module.exports = {
  displayName: 'calculator',
  testEnvironment: 'jsdom',
  setupTestFrameworkScriptFile: './test/setup-test-framework.js',
  moduleNameMapper: {
    // module must come first
    '\\.module\\.css$': 'identity-obj-proxy',
    '\\.css$': '<rootDir>/test/style-mock.js',
    // can also map files that are loaded by webpack with the file-loader
  },
  // normally you'd put this here
  // coverageDirectory: './coverage',
  // collectCoverageFrom: [
  //   '**/src/**/*.js',
  //   '!**/__tests__/**',
  //   '!**/node_modules/**',
  // ],
}

// however, that kinda messes up my setup in this workshop repo
// so I'm doing this weird thing. Basically ignore this and just
// do it inline like I show above :)
if (process.cwd() === __dirname) {
  Object.assign(module.exports, {
    coverageDirectory: './coverage',
    collectCoverageFrom: [
      '**/src/**/*.js',
      '!**/__tests__/**',
      '!**/node_modules/**',
    ],
  })
}
