import { VALIDATION_RULES } from '../constants/validation.constants'
import { OrderStatus } from '../types/order.types'

function validateOrderStatus(status: OrderStatus): string[] {
  const schema = VALIDATION_RULES.order.status

  const { error } = schema.validate(status, { abortEarly: false, convert: false })

  return error?.details.map(error => error.message) || []
}

export const ordersValidator = {
  validateOrderStatus
}
