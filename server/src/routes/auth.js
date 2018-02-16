import {authMiddleware} from '../utils/auth'
import * as authController from '../controllers/auth'

function setupAuthRoutes(router) {
  router.post('/register', authController.register)
  router.post('/login', authController.login)
  router.get('/me', authMiddleware.required, authController.me)
}

export default setupAuthRoutes
