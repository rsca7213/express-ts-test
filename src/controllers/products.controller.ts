import { NextFunction, Request, Response } from 'express'
import { CreateProductRequestDto } from '../interfaces/dto/products/create-product-dto.interface'
import { productsService } from '../services/products.service'
import { UpdateProductRequestDto } from '../interfaces/dto/products/update-product-dto.interface'
import { UpdateProductQuantityRequestDto } from '../interfaces/dto/products/update-product-quantity-dto.interface'
import { UpdateProductPriceRequestDto } from '../interfaces/dto/products/update-product-price-dto.interface'
import { ApiRequest } from '../interfaces/api/request.interface'

async function getAllProducts(req: Request, res: Response, next: NextFunction) {
  const page = Number(req.query.page)
  const limit = Number(req.query.limit)
  const skip = (page - 1) * limit
  const serviceResult = await productsService.getAllProducts(skip, limit)
  return next(serviceResult)
}

async function getProductById(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id)
  const serviceResult = await productsService.getProductById(id)
  return next(serviceResult)
}

async function createProduct(req: Request, res: Response, next: NextFunction) {
  const body: ApiRequest<CreateProductRequestDto> = req.body
  const serviceResult = await productsService.createProduct(body.data)
  return next(serviceResult)
}

async function updateProduct(req: Request, res: Response, next: NextFunction) {
  const body: ApiRequest<UpdateProductRequestDto> = req.body
  const id = Number(req.params.id)
  const serviceResult = await productsService.updateProductById(body.data, id)
  return next(serviceResult)
}

async function deleteProduct(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id)
  const serviceResult = await productsService.deleteProductById(id)
  return next(serviceResult)
}

async function updateProductQuantity(req: Request, res: Response, next: NextFunction) {
  const body: ApiRequest<UpdateProductQuantityRequestDto> = req.body
  const id = Number(req.params.id)
  const serviceResult = await productsService.updateProductQuantityById(body.data.quantity, id)
  return next(serviceResult)
}

async function updateProductPrice(req: Request, res: Response, next: NextFunction) {
  const body: ApiRequest<UpdateProductPriceRequestDto> = req.body
  const id = Number(req.params.id)
  const serviceResult = await productsService.updateProductPriceById(body.data.price, id)
  return next(serviceResult)
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
