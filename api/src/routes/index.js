import express from 'express'
import getApiRouter from './api'

export default getRouter

function getRouter() {
  const router = express.Router()
  router.use('/api', getApiRouter())
  return router
}
