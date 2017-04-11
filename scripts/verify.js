// this file needs to be able to _parse_ in node v0.12.0
if (Number(process.versions.node.slice(0, 1)) < 6) {
  throw new Error('You must have node version 6 installed.')
}
var verifySystem = require('./workshop-setup').verifySystem

verifySystem([
  verifySystem.validators.node('>=6.9.5'),
  verifySystem.validators.mongo('>=3.4.2'),
  verifySystem.validators.yarnNpm('>=0.21.3', '>=4.2.0'),
]).then(function() {
  console.log('🎉  Congrats! Your system is setup properly')
  console.log('You should be good to install and run things.')
}, function(error) {
  console.error(error)
  console.info(
    '\nIf you don\'t care about these warnings, go ' +
    'ahead and install dependencies with `node ./scripts/install`'
  )
  process.exitCode = 1
})
