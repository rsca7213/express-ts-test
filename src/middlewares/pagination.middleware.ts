import { NextFunction, Request, Response } from 'express'
import { ApiResponse } from '../interfaces/api/response.interface'
import { ApiRequest } from '../interfaces/api/request.interface'
import { ParamsDictionary } from 'express-serve-static-core'
import {
  PAGINATION_DEFAULT_LIMIT,
  PAGINATION_DEFAULT_PAGE,
  PAGINATION_MAX_LIMIT,
  PAGINATION_MIN_LIMIT
} from '../constants/pagination.constants'

export function paginationMiddleware<ReqBody, ResBody>(
  req: Request<ParamsDictionary, void, ApiRequest<ReqBody>>,
  res: Response<ApiResponse<ResBody>>,
  next: NextFunction
) {
  let page = Number(req.query.page) || PAGINATION_DEFAULT_PAGE
  let limit = Number(req.query.limit) || PAGINATION_DEFAULT_LIMIT

  if (page < PAGINATION_DEFAULT_PAGE) page = PAGINATION_DEFAULT_PAGE

  if (limit < PAGINATION_MIN_LIMIT) limit = PAGINATION_DEFAULT_LIMIT
  if (limit > PAGINATION_MAX_LIMIT) limit = PAGINATION_MAX_LIMIT

  req.query.page = String(page)
  req.query.limit = String(limit)

  return next()
}
