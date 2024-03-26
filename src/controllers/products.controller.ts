import { NextFunction, Request, Response } from 'express'
import { HttpCodes } from '../types/http-codes.types'

async function getAllProducts(req: Request, res: Response, next: NextFunction) {
  res.status(HttpCodes.NOT_IMPLEMENTED).send()
  return next()
}

async function getProductById(req: Request, res: Response, next: NextFunction) {
  res.status(HttpCodes.NOT_IMPLEMENTED).send()
  return next()
}

async function createProduct(req: Request, res: Response, next: NextFunction) {
  res.status(HttpCodes.NOT_IMPLEMENTED).send()
  return next()
}

async function updateProduct(req: Request, res: Response, next: NextFunction) {
  res.status(HttpCodes.NOT_IMPLEMENTED).send()
  return next()
}

async function deleteProduct(req: Request, res: Response, next: NextFunction) {
  res.status(HttpCodes.NOT_IMPLEMENTED).send()
  return next()
}

async function updateProductQuantity(req: Request, res: Response, next: NextFunction) {
  res.status(HttpCodes.NOT_IMPLEMENTED).send()
  return next()
}

async function updateProductPrice(req: Request, res: Response, next: NextFunction) {
  res.status(HttpCodes.NOT_IMPLEMENTED).send()
  return next()
}

export const productsController = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  updateProductQuantity,
  updateProductPrice
}
