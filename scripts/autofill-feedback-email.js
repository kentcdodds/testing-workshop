const path = require('path')
const replace = require('replace-in-file')

const email = process.argv[2]

if (!email) {
  throw new Error('You must provide an email address as an argument')
}

const clientGlob = [
  path.join(__dirname, '..', 'client/src/**/*.js'),
  path.join(__dirname, '..', 'client/tests/**/*.js'),
]

const apiGlob = [
  path.join(__dirname, '..', 'api/src/**/*.js'),
  path.join(__dirname, '..', 'api/tests/**/*.js'),
]

const options = {
  files: clientGlob.concat(apiGlob),
  from: /&em=\n/,
  to: `&em=${email}`,
}

replace(options).then(
  changedFiles => {
    console.log(`Updated ${changedFiles.length} with the email ${email}`)
  },
  error => {
    console.error('Failed to update files')
    console.error(error.stack)
  }
)

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
