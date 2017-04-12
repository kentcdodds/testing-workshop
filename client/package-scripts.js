const {series, rimraf, commonTags, crossEnv, concurrent} = require('nps-utils')
module.exports = {
  scripts: {
    dev: crossEnv(`PORT=${process.env.PORT || '8080'} react-scripts start`),
    build: 'react-scripts build',
    default: 'pushstate-server build',
    test: {
      default: concurrent.nps('test.unit', 'test.integration'),
      unit: {
        default: testEnv(
          'jest --config=tests/jest.config.unit.json --coverage'
        ),
        watch: testEnv('jest --config=tests/jest.config.unit.json --watch'),
      },
      integration: {
        default: testEnv(
          'jest --config=tests/jest.config.integration.json --coverage'
        ),
        watch: testEnv(
          'jest --config=tests/jest.config.integration.json --watch'
        ),
      },
    },
    validate: concurrent.nps('test', 'demo'),
    demo: {
      default: concurrent.nps('demo.unit'),
      unit: {
        default: 'jest --config=demo/unit/jest.config.json',
        watch: 'jest --config=demo/unit/jest.config.json --watch',
      },
    },
    postinstall: {
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
