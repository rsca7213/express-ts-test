import { NextFunction, Request, Response } from 'express'
import { ordersService } from '../services/orders.service'
import { ApiRequest } from '../interfaces/api/request.interface'
import { CreateOrderRequestDto } from '../interfaces/dto/orders/requests/create-order-dto.interface'
import { UpdateOrderStatusRequestDto } from '../interfaces/dto/orders/requests/update-order-status-dto.interface'
import { GetAllOrdersForCurrentUserResponseDto } from '../interfaces/dto/orders/responses/get-all-orders-for-current-user-dto.interface'
import { GetOrderResponseDto } from '../interfaces/dto/orders/requests/get-order-dto.interface'
import { GetAllOrdersForUserResponseDto } from '../interfaces/dto/orders/responses/get-all-orders-for-user-dto.interface'

async function getAllOrdersForCurrentUser(req: Request, res: Response, next: NextFunction) {
  const page = Number(req.query.page)
  const limit = Number(req.query.limit)
  const skip = (page - 1) * limit
  const body: ApiRequest<void> = req.body
  const serviceResult = await ordersService.getAllOrdersForCurrentUser(body.authUser, skip, limit)

  if (!serviceResult.success || !serviceResult.data) return next(serviceResult)

  const response: GetAllOrdersForCurrentUserResponseDto = {
    orders: serviceResult.data.map(order => {
      return {
        id: order.id,
        lastUpdate: order.lastUpdate,
        orderDate: order.orderDate,
        status: order.status,
        orderProducts: order.orderProducts.map(orderProduct => {
          return {
            product: {
              description: orderProduct.product.description,
              id: orderProduct.product.id,
              name: orderProduct.product.name
            },
            quantity: orderProduct.quantity,
            unitPrice: orderProduct.unitPrice
          }
        })
      }
    })
  }

  return next({
    ...serviceResult,
    data: response
  })
}

async function getOrderById(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id)
  const serviceResult = await ordersService.getOrderById(id)

  if (!serviceResult.success || !serviceResult.data) return next(serviceResult)

  const response: GetOrderResponseDto = {
    id: serviceResult.data.id,
    lastUpdate: serviceResult.data.lastUpdate,
    orderDate: serviceResult.data.orderDate,
    status: serviceResult.data.status,
    userId: serviceResult.data.userId,
    orderProducts: serviceResult.data.orderProducts.map(orderProduct => {
      return {
        product: {
          description: orderProduct.product.description,
          id: orderProduct.product.id,
          name: orderProduct.product.name
        },
        quantity: orderProduct.quantity,
        unitPrice: orderProduct.unitPrice
      }
    })
  }

  return next({
    ...serviceResult,
    data: response
  })
}

async function getAllOrdersByUserId(req: Request, res: Response, next: NextFunction) {
  const page = Number(req.query.page)
  const limit = Number(req.query.limit)
  const skip = (page - 1) * limit
  const id = Number(req.params.id)
  const serviceResult = await ordersService.getAllOrdersByUserId(id, skip, limit)

  if (!serviceResult.success || !serviceResult.data) return next(serviceResult)

  const response: GetAllOrdersForUserResponseDto = {
    orders: serviceResult.data.map(order => {
      return {
        id: order.id,
        lastUpdate: order.lastUpdate,
        orderDate: order.orderDate,
        status: order.status,
        orderProducts: order.orderProducts.map(orderProduct => {
          return {
            product: {
              description: orderProduct.product.description,
              id: orderProduct.product.id,
              name: orderProduct.product.name
            },
            quantity: orderProduct.quantity,
            unitPrice: orderProduct.unitPrice
          }
        })
      }
    })
  }

  return next({
    ...serviceResult,
    data: response
  })
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
