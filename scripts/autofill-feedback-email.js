/* eslint no-console:0 */
const path = require('path')
const inquirer = require('inquirer')
const replace = require('replace-in-file')
const isCI = require('is-ci')

if (isCI) {
  console.log(`Not running autofill feedback as we're on CI`)
} else {
  inquirer
    .prompt([
      {
        name: 'email',
        message: `what's your email address?`,
        validate(val) {
          if (!val) {
            return 'email is required'
          } else if (!val.includes('@')) {
            return 'email requires an @ sign...'
          }
          return true
        },
      },
    ])
    .then(({email}) => {
      const options = {
        files: [
          path.join(__dirname, '..', 'client/src/**/*.js'),
          path.join(__dirname, '..', 'client/test/**/*.js'),
          path.join(__dirname, '..', 'server/src/**/*.js'),
          path.join(__dirname, '..', 'server/test/**/*.js'),
          path.join(__dirname, '..', 'cypress/e2e/**/*.js'),
        ],
        from: /&em=\n/,
        to: `&em=${email}\n`,
      }

      replace(options).then(
        changedFiles => {
          console.log(`Updated ${changedFiles.length} with the email ${email}`)
        },
        error => {
          console.error('Failed to update files')
          console.error(error.stack)
        },
      )
    })
}
