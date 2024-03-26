import { OrderStatus } from '../../../../types/order.types'

export interface UpdateOrderStatusRequestDto {
  status: OrderStatus
}
