import { NextFunction, Request, Response } from 'express'
import { HttpCodes } from '../types/http-codes.types'
import { ordersService } from '../services/orders.service'
import { ApiRequest } from '../interfaces/api/request.interface'

async function getAllOrdersForCurrentUser(req: Request, res: Response, next: NextFunction) {
  const page = Number(req.query.page)
  const limit = Number(req.query.limit)
  const skip = (page - 1) * limit
  const body: ApiRequest<void> = req.body
  const serviceResult = await ordersService.getAllOrdersForCurrentUser(body.authUser, skip, limit)
  return next(serviceResult)
}

async function getOrderById(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id)
  const serviceResult = await ordersService.getOrderById(id)
  return next(serviceResult)
}

async function getAllOrdersByUserId(req: Request, res: Response, next: NextFunction) {
  const page = Number(req.query.page)
  const limit = Number(req.query.limit)
  const skip = (page - 1) * limit
  const id = Number(req.params.id)
  const serviceResult = await ordersService.getAllOrdersByUserId(id, skip, limit)
  return next(serviceResult)
}

async function createOrder(req: Request, res: Response, next: NextFunction) {
  res.status(HttpCodes.NOT_IMPLEMENTED).send()
  return next()
}

async function updateOrder(req: Request, res: Response, next: NextFunction) {
  res.status(HttpCodes.NOT_IMPLEMENTED).send()
  return next()
}

async function deleteOrder(req: Request, res: Response, next: NextFunction) {
  res.status(HttpCodes.NOT_IMPLEMENTED).send()
  return next()
}

async function updateOrderStatus(req: Request, res: Response, next: NextFunction) {
  res.status(HttpCodes.NOT_IMPLEMENTED).send()
  return next()
}

export const ordersController = {
  getAllOrdersForCurrentUser,
  getOrderById,
  getAllOrdersByUserId,
  createOrder,
  updateOrder,
  deleteOrder,
  updateOrderStatus
}
