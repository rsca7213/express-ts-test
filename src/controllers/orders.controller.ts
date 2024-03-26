import { NextFunction, Request, Response } from 'express'
import { ordersService } from '../services/orders.service'
import { ApiRequest } from '../interfaces/api/request.interface'
import { CreateOrderRequestDto } from '../interfaces/dto/orders/create-order-dto.interface'
import { UpdateOrderStatusRequestDto } from '../interfaces/dto/orders/update-order-status-dto.interface'

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
  const body: ApiRequest<CreateOrderRequestDto> = req.body
  const serviceResult = await ordersService.createOrder(body.data.products, body.authUser)
  return next(serviceResult)
}

async function deleteOrder(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id)
  const serviceResult = await ordersService.deleteOrder(id)
  return next(serviceResult)
}

async function updateOrderStatus(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id)
  const body: ApiRequest<UpdateOrderStatusRequestDto> = req.body
  const serviceResult = await ordersService.updateOrderStatus(id, body.data.status)
  return next(serviceResult)
}

export const ordersController = {
  getAllOrdersForCurrentUser,
  getOrderById,
  getAllOrdersByUserId,
  createOrder,
  deleteOrder,
  updateOrderStatus
}
