import { Router } from 'express'
import { productsController } from '../controllers/products.controller'

export const productRouter = Router()

productRouter.get('', productsController.getAllProducts)
productRouter.get(':id', productsController.getProductById)
productRouter.post('', productsController.createProduct)
productRouter.put(':id', productsController.updateProduct)
productRouter.delete(':id', productsController.deleteProduct)
productRouter.patch(':id/quantity', productsController.updateProductQuantity)
productRouter.patch(':id/price', productsController.updateProductPrice)
