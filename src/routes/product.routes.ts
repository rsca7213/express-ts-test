import { Router } from 'express'
import { productsController } from '../controllers/products.controller'
import { authMiddleware } from '../middlewares/auth.middleware'

export const productRouter = Router()

// Before route middlewares
productRouter.use(authMiddleware)

productRouter.get('/', productsController.getAllProducts)
productRouter.get('/:id', productsController.getProductById)
productRouter.post('/', productsController.createProduct)
productRouter.put('/:id', productsController.updateProduct)
productRouter.delete('/:id', productsController.deleteProduct)
productRouter.patch('/:id/quantity', productsController.updateProductQuantity)
productRouter.patch('/:id/price', productsController.updateProductPrice)
