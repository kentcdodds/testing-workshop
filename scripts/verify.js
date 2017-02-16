// this file needs to be able to run
// in older versions of node

var execSync = require('child_process').execSync

var isWindows = (function() {
  return process.platform === 'win32' ||
  process.env.OSTYPE === 'cygwin' ||
  process.env.OSTYPE === 'msys'
})()

var desiredVersions = {
  yarn: '0.20.3',
  node: '6.9.5',
  npm: '4.2.0',
  mongod: '3.4.2',
}

var errors = {
  noYarn: {
    message: 'You do not have yarn installed. This is a package manager client that installs from the regular npm ' +
      'registry, but ensures you get the same versions of all dependencies required for this repository. ' +
      'It is highly recommended that you install yarn: `npm install --global yarn` (learn more: https://yarnpkg.com/)',
    isProblem: false,
  },
  oldYarn: {
    getMessage: function(desired, actual) {
      return 'Your version of yarn (' + actual + ') is older than the recommended version of ' + desired + '. ' +
        'Run `yarn self-update` (or `npm install --global yarn@latest`) to update.'
    },
    isProblem: false,
  },
  oldNode: {
    getMessage: function(desired, actual) {
      return 'Your version of node (' + actual + ') is older than the recommended version of ' + desired + '. ' +
        'Please install a more recent version. You can use http://git.io/nvm or https://github.com/coreybutler/nvm-windows ' +
        'to make upgrading your version of node easier.'
    },
    isProblem: false,
  },
  oldNpm: {
    getMessage: function(desired, actual) {
      return 'Your version of npm (' + actual + ') is older than the recommended version of ' + desired + '. ' +
      'You should install yarn anyway, but if you would rather use npm, please at least have a more recent version. ' +
      'You can install the latest version by running `npm install --global npm@latest`.'
    },
    isProblem: false,
  },
  oldMongod: {
    getMessage: function(desired, actual) {
      return 'Your version of mongod (' + actual + ') is older than the recommended version of ' + desired + '. ' +
        'Please install a more recent version: https://www.mongodb.com/download-center'
    },
    isProblem: false,
  },
  noMongod: {
    isProblem: false,
  },
}

var nodeVersion = process.versions.node
errors.oldNode.isProblem = !versionIsGreater(desiredVersions.node, nodeVersion)
errors.oldNode.message = errors.oldNode.getMessage(desiredVersions.node, nodeVersion)

try {
  var yarnVersion = execSync('yarn --version').toString().trim()
  errors.oldYarn.isProblem = !versionIsGreater(desiredVersions.yarn, yarnVersion)
  errors.oldYarn.message = errors.oldYarn.getMessage(desiredVersions.yarn, yarnVersion)
} catch (e) {
  errors.noYarn.isProblem = true
  var npmVersion = execSync('npm --version').toString().trim()
  errors.oldNpm.isProblem = !versionIsGreater(desiredVersions.npm, npmVersion)
  errors.oldNpm.message = errors.oldNpm.getMessage(desiredVersions.npm, npmVersion)
}

try {
  var mongodBin = isWindows ? '"C:/Program Files/MongoDb/Server/3.4.2/bin/mongod.exe"' : 'mongod'
  var mongoVersionOutput = execSync(mongodBin + ' --version').toString()
  var dbVersion = /db version.*?(\d+\.\d+\.\d+)/.exec(mongoVersionOutput)[1]
  errors.oldMongod.isProblem = !versionIsGreater(desiredVersions.mongod, dbVersion)
  errors.oldMongod.message = errors.oldMongod.getMessage(desiredVersions.mongod, dbVersion)
} catch (e) {
  errors.noMongod.isProblem = true
  console.error('there was an error determining your mongo version')
  console.error(e)
}

var systemErrors = Object.keys(errors)
  .filter(function(key) { return errors[key].isProblem })

var errorCount = systemErrors.length

if (errorCount) {
  var errorMessage = systemErrors
    .reduce(function(messages, key) {
      messages.push('  - ' + errors[key].message)
      return messages
    }, [])
    .join('\n')
  var one = errorCount === 1

  console.error(
    'There ' + (one ? 'is an issue' : 'are some issues') +
    ' with your system. ' +
    'It is quite likely that if you do not resolve these, ' +
    'you will have a hard time running this repository.\n' +
    errorMessage
  )
  console.info(
    'If you don\'t care about these warnings, go ' +
    'ahead and install dependencies with `node ./scripts/install`'
  )
  process.exitCode = 1
} else {
  console.log('🎉  Congrats! Your system is setup properly')
  console.log('You should be good to install and run things.')
}

// returns actualVersion >= desiredVersion
function versionIsGreater(desiredVersion, actualVersion) {

  var desiredVersions = /v?(\d+)\.(\d+)\.(\d+)/.exec(desiredVersion)
  var desiredMajor = Number(desiredVersions[1])
  var desiredMinor = Number(desiredVersions[2])
  var desiredPatch = Number(desiredVersions[3])
  var actualVersions = /v?(\d+)\.(\d+)\.(\d+)/.exec(actualVersion)
  var actualMajor = Number(actualVersions[1])
  var actualMinor = Number(actualVersions[2])
  var actualPatch = Number(actualVersions[3])

  if (actualMajor < desiredMajor) {
    return false
  } else if (actualMajor > desiredMajor) {
    return true
  }
  if (actualMinor < desiredMinor) {
    return false
  } else if (actualMinor > desiredMinor) {
    return true
  }
  if (actualPatch < desiredPatch) {
    return false
  } else if (actualPatch > desiredPatch) {
    return true
  }
  // by this point they should be equal
  return true
}
