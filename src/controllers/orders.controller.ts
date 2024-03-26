import { NextFunction, Request, Response } from 'express'
import { HttpCodes } from '../types/http-codes.types'

async function getAllOrders(req: Request, res: Response, next: NextFunction) {
  res.status(HttpCodes.NOT_IMPLEMENTED).send()
  return next()
}

async function getOrderById(req: Request, res: Response, next: NextFunction) {
  res.status(HttpCodes.NOT_IMPLEMENTED).send()
  return next()
}

async function getOrdersByUserId(req: Request, res: Response, next: NextFunction) {
  res.status(HttpCodes.NOT_IMPLEMENTED).send()
  return next()
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
  getAllOrders,
  getOrderById,
  getOrdersByUserId,
  createOrder,
  updateOrder,
  deleteOrder,
  updateOrderStatus
}
