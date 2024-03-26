import { NextFunction, Request, Response } from 'express'
import { usersService } from '../services/users.service'
import { ApiRequest } from '../interfaces/api/request.interface'
import { CreateUserRequestDto } from '../interfaces/dto/users/create-user-dto.interface'

async function getAllUsers(req: Request, res: Response, next: NextFunction) {
  const serviceResult = await usersService.getAllUsers()
  return next(serviceResult)
}

async function getUserById(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id)
  const serviceResult = await usersService.getUserById(id)
  return next(serviceResult)
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
