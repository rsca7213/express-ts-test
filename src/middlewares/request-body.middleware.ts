import { NextFunction, Request, Response } from 'express'
import { ApiResponse } from '../interfaces/api/response.interface'
import { ParamsDictionary } from 'express-serve-static-core'
import { ApiRequest } from '../interfaces/api/request.interface'

export function requestBodyMiddleware<ReqBody, ResBody>(
  req: Request<ParamsDictionary, ApiResponse<ResBody>, ApiRequest<ReqBody>>,
  res: Response<ApiResponse<ResBody>>,
  next: NextFunction
) {
  const body = req.body

  // Clean the body data of any leading or trailing whitespace
  Object.keys(body).forEach(key => {
    // @ts-expect-error - We know that the body is an object, and that the keys are strings
    if (typeof body[key] === 'string') {
      // @ts-expect-error - At this point in the code, the if condition ensures that body[key] is a string
      body[key] = body[key].trim()
    }
  })

  // @ts-expect-error - Middleware's objective is to cleanse the body and set the data property, matching ApiRequest type
  req.body = {
    data: body as ReqBody
  }

  next()
}
