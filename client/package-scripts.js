const {series, rimraf, commonTags, crossEnv, concurrent} = require('nps-utils')

const hiddenFromHelp = true

module.exports = {
  scripts: {
    default: {
      description: 'run the production server on the build directory',
      script: 'pushstate-server build',
    },
    dev: {
      description: 'run the dev server',
      script: crossEnv(
        `PORT=${process.env.PORT || '8080'} react-scripts start`
      ),
    },
    build: {
      description: 'run the build',
      script: 'react-scripts build',
    },
    test: {
      default: {
        description: 'run both the unit and integrationt tests in parallel',
        script: concurrent.nps('test.unit', 'test.integration'),
      },
      unit: {
        default: {
          description: 'run the unit tests and collect code coverage',
          script: testEnv(
            'jest --config=tests/jest.config.unit.json --coverage'
          ),
        },
        watch: {
          description: 'run the unit tests in watch mode',
          script: testEnv('jest --config=tests/jest.config.unit.json --watch'),
        },
      },
      integration: {
        default: {
          description: 'run the integration tests and collect coverage',
          script: testEnv(
            'jest --config=tests/jest.config.integration.json --coverage'
          ),
        },
        watch: {
          description: 'run the integration tests in watch mode',
          script: testEnv(
            'jest --config=tests/jest.config.integration.json --watch'
          ),
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
        script: concurrent.nps('demo.unit'),
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
          script: 'echo "no integration demo"',
        },
        watch: {
          hiddenFromHelp,
          script: 'echo "no integration demo"',
        },
      },
    },
    postinstall: {
      hiddenFromHelp,
      description: commonTags.oneLine`
        Happens after you run install,
        otherwise you'd have some confusing
        things going on with your editor
      `,
      script: series(
        `echo "removing client copy of eslint (will use root repo's version)"`,
        rimraf('node_modules/eslint')
      ),
    },
  },
}

function testEnv(script) {
  return crossEnv(`NODE_ENV=test ${script}`)
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
