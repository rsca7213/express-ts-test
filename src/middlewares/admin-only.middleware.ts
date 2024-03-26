import { NextFunction, Request, Response } from 'express'
import { ApiRequest } from '../interfaces/api/request.interface'
import { ApiResponse } from '../interfaces/api/response.interface'
import { HttpCodes } from '../types/http-codes.types'
import { ParamsDictionary } from 'express-serve-static-core'

export function adminOnlyMiddleware<ReqBody, ResBody>(
  req: Request<ParamsDictionary, void, ApiRequest<ReqBody>>,
  res: Response<ApiResponse<ResBody>>,
  next: NextFunction
) {
  if (req.body.authUser.role === 'Administrator') return next()

  return res.status(HttpCodes.FORBIDDEN).json({
    success: false,
    message: 'This request is invalid because the user is not allowed to perform this action',
    error: 'The user is not allowed to perform this action',
    details: []
  })
}
