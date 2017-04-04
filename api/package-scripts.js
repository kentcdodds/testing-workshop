const {series, rimraf} = require('nps-utils')

module.exports = {
  scripts: {
    default: 'node ./dist',
    dev: 'nodemon ./src --exec babel-node ./src',
    generateData: 'babel-node scripts/generate',
    build: series(
      rimraf('dist'),
      'babel --copy-files --out-dir dist --ignore __tests__,__mocks__ src'
    ),
    test: {
      default: 'jest --coverage',
      watch: 'jest --watch',
    },
    demo: {
      test: {
        default: 'jest --config=demo/jest-config.json',
        watch: 'jest --config=demo/jest-config.json --watch',
      },
    },
  },
}

// this is not transpiled
/*
  eslint
  comma-dangle: [
    2,
    {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      functions: 'never'
    }
  ]
 */
