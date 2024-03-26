import { NextFunction, Request, Response } from 'express'
import { HttpCodes } from '../types/http-codes.types'

async function getCurrentAuthUser(req: Request, res: Response, next: NextFunction) {
  res.status(HttpCodes.NOT_IMPLEMENTED).send()
  return next()
}

async function login(req: Request, res: Response, next: NextFunction) {
  res.status(HttpCodes.NOT_IMPLEMENTED).send()
  return next()
}

async function register(req: Request, res: Response, next: NextFunction) {
  res.status(HttpCodes.NOT_IMPLEMENTED).send()
  return next()
}

export const authController = {
  getCurrentAuthUser,
  login,
  register
}
