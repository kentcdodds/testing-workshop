const {series, rimraf, commonTags} = require('nps-utils')
module.exports = {
  scripts: {
    dev: 'react-scripts start',
    build: 'react-scripts build',
    default: 'pushstate-server build',
    test: {
      default: 'jest --coverage',
      watch: 'jest --watch',
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
