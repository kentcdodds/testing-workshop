const {
  series,
  concurrent,
  rimraf,
  commonTags: {oneLine},
} = require('nps-utils')

const hiddenFromHelp = true

module.exports = {
  scripts: {
    default: {
      description: 'start the production server',
      script: 'node ./dist',
    },
    dev: {
      description: 'start the dev server (restarts on file changes)',
      script: 'nodemon --watch ./src --exec babel-node ./src',
    },
    generateData: {
      hiddenFromHelp,
      script: 'babel-node scripts/generate',
    },
    build: {
      hiddenFromHelp,
      description: 'Transpile the source files to the `dist` directory',
      script: series(
        rimraf('dist'),
        'babel --copy-files --out-dir dist --ignore __tests__,__mocks__ src'
      ),
    },
    test: {
      default: {
        description: 'Run both unit and integration tests in parallel',
        script: concurrent.nps('test.unit', 'test.integration'),
      },
      unit: {
        default: {
          description: 'Run the unit tests and collect coverage',
          script: 'jest --config=tests/jest.config.unit.json --coverage',
        },
        watch: {
          description: 'run the unit tests in watch mode',
          script: 'jest --config=tests/jest.config.unit.json --watch',
        },
      },
      integration: {
        default: {
          description: oneLine`
            Run the integration tests and collect coverage.
            NOTE: the mongodb server must be running!
          `,
          script: 'jest --config=tests/jest.config.integration.json --coverage',
        },
        watch: {
          description: oneLine`
            Run the integration tests in watch mode.
            NOTE: the mongodb server must be running!
          `,
          script: 'jest --config=tests/jest.config.integration.json --watch',
        },
      },
    },
    validate: {
      hiddenFromHelp,
      script: concurrent.nps('test', 'demo'),
    },
    demo: {
      default: {
        hiddenFromHelp,
        script: concurrent.nps('demo.unit', 'demo.integration'),
      },
      unit: {
        default: {
          hiddenFromHelp,
          script: 'jest --config=demo/unit/jest.config.json',
        },
        watch: {
          hiddenFromHelp,
          script: 'jest --config=demo/unit/jest.config.json --watch',
        },
      },
      integration: {
        default: {
          hiddenFromHelp,
          script: 'jest --config=demo/integration/jest.config.json',
        },
        watch: {
          hiddenFromHelp,
          script: 'jest --config=demo/integration/jest.config.json --watch',
        },
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
