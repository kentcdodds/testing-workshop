if (process.env.NODE_ENV === 'production') {
  require('./dist')
} else {
  require('babel-register')
  require('./src')
}
