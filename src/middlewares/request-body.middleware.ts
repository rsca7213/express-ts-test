import { NextFunction, Request, Response } from 'express'
import { ApiRequest } from '../interfaces/api/request.interface'
import { ApiResponse } from '../interfaces/api/response.interface'

export function requestBodyMiddleware<ReqBody, ResBody>(
  req: Request<ApiRequest<ReqBody>>,
  res: Response<ApiResponse<ResBody>>,
  next: NextFunction
) {
  const body = req.body || {}

  // Clean the body data of any leading or trailing whitespace
  Object.keys(body).forEach(key => {
    if (typeof body[key] === 'string') {
      body[key] = body[key].trim()
    }
  })

  req.body = {
    data: body
  }

  next()
}
