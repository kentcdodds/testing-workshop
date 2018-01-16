import logger from 'loglevel'
import startServer from './start'

const notProd = process.env.NODE_ENV !== 'production'
const notTest = process.env.NODE_ENV !== 'test'
const logLevel = process.env.LOG_LEVEL || (notProd && notTest ? 'info' : 'warn')

logger.setLevel(logLevel)

startServer()
