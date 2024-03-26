import { NextFunction, Request, Response } from 'express'
import { ApiRequest } from '../interfaces/api/request.interface'
import { LoginRequestDto } from '../interfaces/dto/auth/requests/login-dto.interface'
import { authService } from '../services/auth.service'
import { RegisterUserRequestDto } from '../interfaces/dto/auth/requests/register-user-dto.interface'

async function login(req: Request, res: Response, next: NextFunction) {
  const body: ApiRequest<LoginRequestDto> = req.body
  const serviceResult = await authService.login(body.data.email, body.data.password)
  return next(serviceResult)
}

async function register(req: Request, res: Response, next: NextFunction) {
  const body: ApiRequest<RegisterUserRequestDto> = req.body
  const serviceResult = await authService.registerUser(body.data, body.data.password)
  return next(serviceResult)
}

export const authController = {
  login,
  register
}
