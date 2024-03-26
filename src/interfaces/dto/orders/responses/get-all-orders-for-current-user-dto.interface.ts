import { OrderStatus } from '../../../../types/order.types'

export interface GetAllOrdersForCurrentUserResponseDto {
  orders: {
    id: number
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
  }[]
}
