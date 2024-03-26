import { ServiceResult } from '../interfaces/services/service-result.interface'
import { AuthUser } from '../models/auth-user.model'
import { Order } from '../models/order.model'
import { ordersRepository } from '../repositories/orders.repository'
import { usersRepository } from '../repositories/users.repository'
import { sharedValidator } from '../validators/shared.validator'

async function getAllOrdersForCurrentUser(
  authUser: AuthUser,
  skip: number,
  limit: number
): Promise<ServiceResult<Order[]>> {
  let orders: Order[]
  let count: number

  try {
    orders = await ordersRepository.getRangeByUserId(authUser.id, skip, limit)
    count = await ordersRepository.countByUserId(authUser.id)
  } catch {
    return {
      success: false,
      data: [],
      errors: ['Orders could not be retrieved because an unexpected error occurred'],
      errorType: 'UNEXPECTED',
      message: 'An error occurred while retrieving orders'
    }
  }

  return {
    success: true,
    data: orders,
    message: 'Orders retrieved successfully',
    pagination: {
      page: Math.floor(skip / limit) + 1,
      limit,
      itemCount: count,
      pageCount: Math.ceil(count / limit)
    }
  }
}

async function getAllOrdersByUserId(
  userId: number,
  skip: number,
  limit: number
): Promise<ServiceResult<Order[]>> {
  let orders: Order[]
  let count: number

  // Validation
  const errors: string[] = sharedValidator.validateId(userId)

  if (errors.length) {
    return {
      success: false,
      data: [],
      errors,
      errorType: 'VALIDATION',
      message: 'Orders could not be retrieved due to validation errors'
    }
  }

  // Verify that user by specified id exists
  const userExists = await usersRepository.getById(userId)

  if (!userExists)
    return {
      success: false,
      data: [],
      errors: ['User not found'],
      errorType: 'NOT_FOUND',
      message: 'Orders could not be retrieved due to verification errors'
    }

  try {
    orders = await ordersRepository.getRangeByUserId(userId, skip, limit)
    count = await ordersRepository.countByUserId(userId)
  } catch {
    return {
      success: false,
      data: [],
      errors: ['Orders could not be retrieved because an unexpected error occurred'],
      errorType: 'UNEXPECTED',
      message: 'An error occurred while retrieving orders'
    }
  }

  return {
    success: true,
    data: orders,
    message: 'Orders retrieved successfully',
    pagination: {
      page: Math.floor(skip / limit) + 1,
      limit,
      itemCount: count,
      pageCount: Math.ceil(count / limit)
    }
  }
}

async function getOrderById(id: number): Promise<ServiceResult<Order | null>> {
  let order: Order | null

  // Validation
  const errors: string[] = sharedValidator.validateId(id)

  if (errors.length) {
    return {
      success: false,
      data: null,
      errors,
      errorType: 'VALIDATION',
      message: 'Order could not be retrieved due to validation errors'
    }
  }

  // Get order
  try {
    order = await ordersRepository.getById(id)
  } catch {
    return {
      success: false,
      data: null,
      errors: ['Order could not be retrieved because an unexpected error occurred'],
      errorType: 'UNEXPECTED',
      message: 'An error occurred while retrieving order'
    }
  }

  if (!order) {
    return {
      success: false,
      data: null,
      errors: ['Order not found'],
      errorType: 'NOT_FOUND',
      message: 'Order could not be retrieved due to verification errors'
    }
  }

  return {
    success: true,
    data: order,
    message: 'Order retrieved succesfully'
  }
}

export const ordersService = {
  getAllOrdersForCurrentUser,
  getAllOrdersByUserId,
  getOrderById
}
