import { Router } from 'express'
import { ordersController } from '../controllers/orders.controller'

export const orderRouter = Router()

orderRouter.get('', ordersController.getAllOrders)
orderRouter.get(':id', ordersController.getOrderById)
orderRouter.get('/user/:id', ordersController.getAllOrdersByUserId)
orderRouter.post('', ordersController.createOrder)
orderRouter.put(':id', ordersController.updateOrder)
orderRouter.delete(':id', ordersController.deleteOrder)
orderRouter.patch(':id/status', ordersController.updateOrderStatus)
