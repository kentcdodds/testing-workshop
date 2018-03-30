;(async () => {
  require('babel-register')
  const serverTestUtils = require('./test/til-server-test-utils')
  await serverTestUtils.initDb()
  await serverTestUtils.insertTestUser()
  require('./src')
})()
