import { Router } from 'express'
import { usersController } from '../controllers/users.controller'

export const userRouter = Router()

userRouter.get('/', usersController.getAllUsers)
userRouter.get('/:id', usersController.getUserById)
userRouter.post('/', usersController.createUser)
userRouter.put('/:id', usersController.updateUser)
userRouter.delete('/:id', usersController.deleteUser)
