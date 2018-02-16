;(async () => {
  require('babel-register')
  const serverTestUtils = require('./test/server-test-utils')
  await serverTestUtils.initDb()
  await serverTestUtils.insertTestUser()
  require('./src')
})()
