import { NextFunction, Request, Response } from 'express'
import { usersService } from '../services/users.service'
import { ApiRequest } from '../interfaces/api/request.interface'
import { CreateUserRequestDto } from '../interfaces/dto/users/requests/create-user-dto.interface'
import { GetUserResponseDto } from '../interfaces/dto/users/responses/get-user-dto.interface'
import { GetAllUsersResponseDto } from '../interfaces/dto/users/responses/get-all-users-dto.interface'

async function getAllUsers(req: Request, res: Response, next: NextFunction) {
  const page = Number(req.query.page)
  const limit = Number(req.query.limit)
  const skip = (page - 1) * limit
  const serviceResult = await usersService.getAllUsers(skip, limit)

  if (!serviceResult.success || !serviceResult.data) return next(serviceResult)

  const response: GetAllUsersResponseDto = {
    users: serviceResult.data.map(user => {
      return {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      }
    })
  }

  return next({
    ...serviceResult,
    data: response
  })
}

async function getUserById(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id)
  const serviceResult = await usersService.getUserById(id)

  if (!serviceResult.success || !serviceResult.data) return next(serviceResult)

  const response: GetUserResponseDto = {
    email: serviceResult.data.email,
    firstName: serviceResult.data.firstName,
    lastName: serviceResult.data.lastName,
    role: serviceResult.data.role
  }

  return next({
    ...serviceResult,
    data: response
  })
}

async function createUser(req: Request, res: Response, next: NextFunction) {
  const body: ApiRequest<CreateUserRequestDto> = req.body
  const serviceResult = await usersService.createUser(body.data, body.data.password)
  return next(serviceResult)
}

async function updateUser(req: Request, res: Response, next: NextFunction) {
  const body: ApiRequest<CreateUserRequestDto> = req.body
  const id = Number(req.params.id)
  const serviceResult = await usersService.updateUserById(id, body.data, body.data.password)
  return next(serviceResult)
}

async function deleteUser(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id)
  const serviceResult = await usersService.deleteUserById(id)
  return next(serviceResult)
}

export const usersController = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
}
