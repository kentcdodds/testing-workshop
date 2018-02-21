/* eslint no-console:0 */
const path = require('path')
const inquirer = require('inquirer')
const replace = require('replace-in-file')

inquirer
  .prompt([
    {
      name: 'email',
      message: `what's your email address?`,
      validate(val) {
        return Boolean(val) || 'email is required'
      },
    },
  ])
  .then(({email}) => {
    const options = {
      files: [
        path.join(__dirname, '..', 'client/src/**/*.js'),
        path.join(__dirname, '..', 'client/tests/**/*.js'),
        path.join(__dirname, '..', 'server/src/**/*.js'),
        path.join(__dirname, '..', 'server/tests/**/*.js'),
        path.join(__dirname, '..', 'cypress/e2e/**/*.js'),
      ],
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
      },
    )
  })
