import { Router } from 'express'
import { productsController } from '../controllers/products.controller'
import { authMiddleware } from '../middlewares/auth.middleware'
import { adminOnlyMiddleware } from '../middlewares/admin-only.middleware'
export const productRouter = Router()

// Before route middlewares
productRouter.use(authMiddleware)

productRouter.get('/', productsController.getAllProducts)
productRouter.get('/:id', productsController.getProductById)
productRouter.post('/', adminOnlyMiddleware, productsController.createProduct)
productRouter.put('/:id', adminOnlyMiddleware, productsController.updateProduct)
productRouter.delete('/:id', adminOnlyMiddleware, productsController.deleteProduct)
productRouter.patch('/:id/quantity', adminOnlyMiddleware, productsController.updateProductQuantity)
productRouter.patch('/:id/price', adminOnlyMiddleware, productsController.updateProductPrice)
