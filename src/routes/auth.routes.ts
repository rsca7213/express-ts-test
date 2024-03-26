import { Router } from 'express'
import { authController } from '../controllers/auth.controller'

export const authRouter = Router()

authRouter.get('', authController.getCurrentAuthUser)
authRouter.post('login', authController.login)
authRouter.post('register', authController.register)
