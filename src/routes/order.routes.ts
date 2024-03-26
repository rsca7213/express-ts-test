import { Router } from 'express'
import { ordersController } from '../controllers/orders.controller'
import { authMiddleware } from '../middlewares/auth.middleware'
import { adminOnlyMiddleware } from '../middlewares/admin-only.middleware'
import { paginationMiddleware } from '../middlewares/pagination.middleware'

export const orderRouter = Router()

// Before route middlewares
orderRouter.use(authMiddleware)

orderRouter.get('/', paginationMiddleware, ordersController.getAllOrdersForCurrentUser)
orderRouter.post('/', ordersController.createOrder)
orderRouter.get('/:id', adminOnlyMiddleware, ordersController.getOrderById)
orderRouter.get(
  '/user/:id',
  paginationMiddleware,
  adminOnlyMiddleware,
  ordersController.getAllOrdersByUserId
)
orderRouter.delete('/:id', adminOnlyMiddleware, ordersController.deleteOrder)
orderRouter.patch('/:id/status', adminOnlyMiddleware, ordersController.updateOrderStatus)
