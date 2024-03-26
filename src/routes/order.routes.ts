import { Router } from 'express'
import { ordersController } from '../controllers/orders.controller'
import { authMiddleware } from '../middlewares/auth.middleware'
import { adminOnlyMiddleware } from '../middlewares/admin-only.middleware'
import { paginationMiddleware } from '../middlewares/pagination.middleware'

export const orderRouter = Router()

// Before route middlewares
orderRouter.use(authMiddleware)

orderRouter.get('/', paginationMiddleware, ordersController.getAllOrdersForCurrentUser)
orderRouter.get('/:id', ordersController.getOrderById)
orderRouter.post('/', ordersController.createOrder)
orderRouter.get(
  '/user/:id',
  paginationMiddleware,
  adminOnlyMiddleware,
  ordersController.getAllOrdersByUserId
)
orderRouter.put('/:id', adminOnlyMiddleware, ordersController.updateOrder)
orderRouter.delete('/:id', adminOnlyMiddleware, ordersController.deleteOrder)
orderRouter.patch('/:id/status', adminOnlyMiddleware, ordersController.updateOrderStatus)
