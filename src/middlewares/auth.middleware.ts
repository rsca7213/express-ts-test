import { NextFunction, Request, Response } from 'express'
import { ApiRequest } from '../interfaces/api/request.interface'
import { ApiResponse } from '../interfaces/api/response.interface'
import { HttpCodes } from '../types/http-codes.types'
import { AuthUser } from '../models/auth-user.model'
import { authTokenUtil } from '../utils/auth-token.util'
import { usersRepository } from '../repositories/users.repository'
import { ParamsDictionary } from 'express-serve-static-core'

export async function authMiddleware<ReqBody, ResBody>(
  req: Request<ParamsDictionary, ApiResponse<ResBody>, ApiRequest<ReqBody>>,
  res: Response<ApiResponse<ResBody>>,
  next: NextFunction
) {
  const token = req.headers.authorization
  let user: AuthUser

  if (!token) {
    return res.status(HttpCodes.UNAUTHORIZED).json({
      success: false,
      message: 'This request is invalid because it requires an authorization token',
      error: 'No authorization token was provided',
      details: []
    })
  }

  try {
    user = authTokenUtil.verifyToken(token)
  } catch {
    return res.status(HttpCodes.UNAUTHORIZED).json({
      success: false,
      message: 'This request is invalid because the authorization token is invalid',
      error: 'The authorization token was invalid',
      details: []
    })
  }

  const doesUserExist = await usersRepository.existsById(user.id)

  if (!doesUserExist) {
    return res.status(HttpCodes.UNAUTHORIZED).json({
      success: false,
      message: 'This request is invalid because the user does not exist',
      error: 'The user does not exist',
      details: []
    })
  }

  req.body.authUser = user

  next()
}
