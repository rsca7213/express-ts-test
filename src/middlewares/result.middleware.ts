import { NextFunction, Request, Response } from 'express'
import { ServiceResult } from '../interfaces/services/service-result.interface'
import { HttpCodes } from '../types/http-codes.types'
import { ApiRequest } from '../interfaces/api/request.interface'
import { ApiResponse } from '../interfaces/api/response.interface'
import { ParamsDictionary } from 'express-serve-static-core'

export function resultMiddleware<ReqBody, ResBody>(
  serviceResult: ServiceResult<ResBody>,
  req: Request<ParamsDictionary, ApiResponse<ResBody>, ApiRequest<ReqBody>>,
  res: Response<ApiResponse<ResBody>>,
  next: NextFunction
) {
  if (serviceResult.success) {
    res.status(HttpCodes.OK).json({
      success: true,
      message: serviceResult.message,
      data: serviceResult.data,
      pagination: serviceResult.pagination
    })
    return next()
  }

  switch (serviceResult.errorType) {
    case 'VALIDATION':
      res.status(HttpCodes.BAD_REQUEST).json({
        success: false,
        message: 'This request is invalid due to validation errors',
        error: serviceResult.message,
        details: serviceResult.errors
      })
      break
    case 'NOT_FOUND':
      res.status(HttpCodes.NOT_FOUND).json({
        success: false,
        message: 'This request is invalid because the requested resource was not found',
        error: serviceResult.message,
        details: serviceResult.errors
      })
      break
    case 'ALREADY_EXISTS':
      res.status(HttpCodes.CONFLICT).json({
        success: false,
        message: 'This request is invalid because it conflicts with another resource',
        error: serviceResult.message,
        details: serviceResult.errors
      })
      break
    default:
      res.status(HttpCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'An unexpected error has occurred while processing this request',
        error: serviceResult.message,
        details: serviceResult.errors
      })
      break
  }

  next()
}
