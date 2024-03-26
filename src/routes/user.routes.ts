import { Router } from 'express'
import { usersController } from '../controllers/users.controller'
import { authMiddleware } from '../middlewares/auth.middleware'
import { adminOnlyMiddleware } from '../middlewares/admin-only.middleware'
import { paginationMiddleware } from '../middlewares/pagination.middleware'

export const userRouter = Router()

// Before route middlewares
userRouter.use(authMiddleware)
userRouter.use(adminOnlyMiddleware)

userRouter.get('/', paginationMiddleware, usersController.getAllUsers)
userRouter.get('/:id', usersController.getUserById)
userRouter.post('/', usersController.createUser)
userRouter.put('/:id', usersController.updateUser)
userRouter.delete('/:id', usersController.deleteUser)
