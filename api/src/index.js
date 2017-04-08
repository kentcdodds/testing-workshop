import logger from 'loglevel'
import startServer from './start-server'

logger.setLevel(getLogLevel())

startServer()

function getLogLevel() {
  const notProd = process.env.NODE_ENV !== 'production'
  const notTest = process.env.NODE_ENV !== 'test'
  return process.env.LOG_LEVEL || (notProd && notTest ? 'info' : 'warn')
}
