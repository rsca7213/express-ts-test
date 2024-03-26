import { OrderStatus } from '../../../types/order.types'

export interface GetOrderResponseDto {
  id: number
  userId: number
  status: OrderStatus
  orderDate: Date
  lastUpdate: Date
  orderProducts: {
    quantity: number
    unitPrice: number
    product: {
      id: number
      name: string
      description: string
    }
  }[]
}
