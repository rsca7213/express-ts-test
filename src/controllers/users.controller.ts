import { NextFunction, Request, Response } from 'express'
import { HttpCodes } from '../types/http-codes.types'

async function getAllUsers(req: Request, res: Response, next: NextFunction) {
  res.status(HttpCodes.NOT_IMPLEMENTED).send()
  return next()
}

async function getUserById(req: Request, res: Response, next: NextFunction) {
  res.status(HttpCodes.NOT_IMPLEMENTED).send()
  return next()
}

async function createUser(req: Request, res: Response, next: NextFunction) {
  res.status(HttpCodes.NOT_IMPLEMENTED).send()
  return next()
}

async function updateUser(req: Request, res: Response, next: NextFunction) {
  res.status(HttpCodes.NOT_IMPLEMENTED).send()
  return next()
}

async function deleteUser(req: Request, res: Response, next: NextFunction) {
  res.status(HttpCodes.NOT_IMPLEMENTED).send()
  return next()
}

export const usersController = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
}
