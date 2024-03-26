import { ServiceResult } from '../interfaces/services/service-result.interface'
import { AuthUser } from '../models/auth-user.model'
import { Order } from '../models/order.model'
import { ordersRepository } from '../repositories/orders.repository'
import { productsRepository } from '../repositories/products.repository'
import { usersRepository } from '../repositories/users.repository'
import { productsValidator } from '../validators/products.validator'
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

async function createOrder(
  products: {
    id: number
    quantity: number
  }[],
  authUser: AuthUser
): Promise<ServiceResult<void>> {
  // Validation
  const errors: string[] = []

  if (!Array.isArray(products) || products.length === 0)
    return {
      success: false,
      data: undefined,
      errors: ['Products array is empty or missing'],
      errorType: 'VALIDATION',
      message: 'Order could not be created due to validation errors'
    }

  products.forEach(product => {
    errors.push(...sharedValidator.validateId(product.id))
    errors.push(...productsValidator.validateProductQuantity(product.quantity))
  })

  if (errors.length) {
    return {
      success: false,
      errors,
      data: undefined,
      errorType: 'VALIDATION',
      message: 'Order could not be created due to validation errors'
    }
  }

  // initialize products unit price
  const productsToOrder = products.map(p => {
    return {
      id: p.id,
      quantity: p.quantity,
      stock: 0,
      unitPrice: 0
    }
  })

  // Verify that all products exist and have enough stock for required quantity
  for (const productToOrder of productsToOrder) {
    const product = await productsRepository.getById(productToOrder.id)

    if (!product) {
      return {
        success: false,
        data: undefined,
        errors: [`Product with id ${productToOrder.id} not found`],
        errorType: 'NOT_FOUND',
        message: 'Order could not be created due to verification errors'
      }
    }

    if (product.quantity < productToOrder.quantity) {
      return {
        success: false,
        data: undefined,
        errors: [
          `Product with id ${productToOrder.id} does not have enough available stock (current stock = ${product.quantity})`
        ],
        errorType: 'INSUFFICIENT_ITEMS',
        message: 'Order could not be created due to verification errors'
      }
    }

    // if valid item, add unitPrice and stock to productToOrder
    productToOrder.unitPrice = product.price
    productToOrder.stock = product.quantity
  }

  const orderToSave = {
    status: 'Pending',
    userId: authUser.id,
    orderDate: new Date(),
    lastUpdate: new Date(),
    orderProducts: productsToOrder.map(p => {
      return {
        productId: p.id,
        quantity: p.quantity,
        unitPrice: p.unitPrice
      }
    })
  } as Omit<Order, 'id'>

  // Create order
  try {
    await ordersRepository.create(orderToSave)

    // Update product quantities
    for (const productToOrder of productsToOrder) {
      const remainingStock = productToOrder.stock - productToOrder.quantity
      await productsRepository.updateQuantityById(productToOrder.id, remainingStock)
    }
  } catch {
    return {
      success: false,
      data: undefined,
      errors: ['Order could not be created because an unexpected error occurred'],
      errorType: 'UNEXPECTED',
      message: 'An error occurred while creating order'
    }
  }

  return {
    success: true,
    data: undefined,
    message: 'Order created successfully'
  }
}

async function deleteOrder(id: number): Promise<ServiceResult<void>> {
  // Validation
  const errors: string[] = sharedValidator.validateId(id)

  if (errors.length) {
    return {
      success: false,
      data: undefined,
      errors,
      errorType: 'VALIDATION',
      message: 'Order could not be deleted due to validation errors'
    }
  }

  // Verify that order exists
  const order = await ordersRepository.getById(id)

  if (!order) {
    return {
      success: false,
      data: undefined,
      errors: ['Order not found'],
      errorType: 'NOT_FOUND',
      message: 'Order could not be deleted due to verification errors'
    }
  }

  // Delete order
  try {
    await ordersRepository.removeById(id)
  } catch {
    return {
      success: false,
      data: undefined,
      errors: ['Order could not be deleted because an unexpected error occurred'],
      errorType: 'UNEXPECTED',
      message: 'An error occurred while deleting order'
    }
  }

  return {
    success: true,
    data: undefined,
    message: 'Order deleted successfully'
  }
}

export const ordersService = {
  getAllOrdersForCurrentUser,
  getAllOrdersByUserId,
  getOrderById,
  createOrder,
  deleteOrder
}
