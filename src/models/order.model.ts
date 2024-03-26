import { OrderStatus } from '../types/order.types'
import { OrderProduct } from './order-product.model'

export interface Order {
  id: number
  userId: number
  status: OrderStatus
  orderProducts: OrderProduct[]
  orderDate: Date
  lastUpdate: Date
}
