// See this for details: https://github.com/aredridel/node-bin-gen/issues/45
const fs = require('fs')
const pkg = require('../package.json')

delete pkg.devDependencies.node

fs.writeFileSync(
  require.resolve('../package.json'),
  JSON.stringify(pkg, null, 2),
)
