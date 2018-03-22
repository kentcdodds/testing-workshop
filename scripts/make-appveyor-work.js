// See this for details: https://github.com/aredridel/node-bin-gen/issues/45
const path = require('path')
const fs = require('fs')
const pkg = require('../package.json')

delete pkg.devDependencies.node

fs.writeFileSync(
  require.resolve('../package.json'),
  JSON.stringify(pkg, null, 2),
)

// hopefully this is only temporary
rimraf(path.join(__dirname, '../node_modules'))
rimraf(path.join(__dirname, '../client/node_modules'))
rimraf(path.join(__dirname, '../server/node_modules'))
rimraf(path.join(__dirname, '../shared/node_modules'))

function rimraf(dir) {
  if (fs.existsSync(dir)) {
    fs.readdirSync(dir).forEach(entry => {
      const entryPath = path.join(dir, entry)
      if (fs.lstatSync(entryPath).isDirectory()) {
        rimraf(entryPath)
      } else {
        fs.unlinkSync(entryPath)
      }
    })
    fs.rmdirSync(dir)
  }
}
