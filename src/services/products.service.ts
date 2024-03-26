import { ServiceResult } from '../interfaces/services/service-result.interface'
import { Product } from '../models/product.model'
import { productsRepository } from '../repositories/products.repository'
import { productsValidator } from '../validators/products.validator'
import { sharedValidator } from '../validators/shared.validator'

async function getAllProducts(): Promise<ServiceResult<Product[]>> {
  const products = await productsRepository.getAll()

  return {
    success: true,
    data: products,
    message: 'Products retrieved successfully'
  }
}

async function getProductById(id: number): Promise<ServiceResult<Product | null>> {
  // Validation
  const errors: string[] = sharedValidator.validateId(id)

  if (errors.length) {
    return {
      success: false,
      data: null,
      errors,
      errorType: 'VALIDATION',
      message: 'Product could not be retrieved due to validation errors'
    }
  }

  // Get product
  const product = await productsRepository.getById(id)

  if (!product) {
    return {
      success: false,
      data: null,
      errors: ['Product not found'],
      errorType: 'NOT_FOUND',
      message: 'Product could not be retrieved due to verification errors'
    }
  }

  return {
    success: true,
    data: product,
    message: 'Product retrieved successfully'
  }
}

async function createProduct(product: Omit<Product, 'id'>): Promise<ServiceResult<void>> {
  // Validation
  const errors: string[] = productsValidator.validateProductFields(product)

  if (errors.length) {
    return {
      success: false,
      data: undefined,
      errors,
      errorType: 'VALIDATION',
      message: 'Product could not be created due to validation errors'
    }
  }

  // Verify that product by the same name does not already exist
  const productByNameExists = await productsRepository.existsByName(product.name)

  if (productByNameExists) {
    return {
      success: false,
      data: undefined,
      errors: ['Product with the same name already exists'],
      errorType: 'ALREADY_EXISTS',
      message: 'Product could not be created due to verification errors'
    }
  }

  // Create product
  try {
    await productsRepository.create(product)
  } catch {
    return {
      success: false,
      data: undefined,
      errors: ['Product could not be created because an unexpected error occurred'],
      errorType: 'UNEXPECTED',
      message: 'An error occurred while creating the product'
    }
  }

  return {
    success: true,
    data: undefined,
    message: 'Product created successfully'
  }
}

async function updateProductById(
  product: Omit<Product, 'id'>,
  id: number
): Promise<ServiceResult<void>> {
  // Validation
  const errors: string[] = [
    ...productsValidator.validateProductFields(product),
    ...sharedValidator.validateId(id)
  ]

  if (errors.length) {
    return {
      success: false,
      data: undefined,
      errors,
      errorType: 'VALIDATION',
      message: 'Product could not be updated due to validation errors'
    }
  }

  // Verify that product exists
  const productExists = await productsRepository.existsById(id)

  if (!productExists) {
    return {
      success: false,
      data: undefined,
      errors: ['Product not found'],
      errorType: 'NOT_FOUND',
      message: 'Product could not be updated due to verification errors'
    }
  }

  // Verify that product by the same name does not already exist
  const productByNameExists = await productsRepository.existsByNameExcludingId(id, product.name)

  if (productByNameExists) {
    return {
      success: false,
      data: undefined,
      errors: ['Product with the same name already exists'],
      errorType: 'ALREADY_EXISTS',
      message: 'Product could not be updated due to verification errors'
    }
  }

  // Update product
  try {
    await productsRepository.updateById(id, product)
  } catch {
    return {
      success: false,
      data: undefined,
      errors: ['Product could not be updated because an unexpected error occurred'],
      errorType: 'UNEXPECTED',
      message: 'An error occurred while updating the product'
    }
  }

  return {
    success: true,
    data: undefined,
    message: 'Product updated successfully'
  }
}

async function deleteProductById(id: number): Promise<ServiceResult<void>> {
  // Validation
  const errors: string[] = sharedValidator.validateId(id)

  if (errors.length) {
    return {
      success: false,
      data: undefined,
      errors,
      errorType: 'VALIDATION',
      message: 'Product could not be deleted due to validation errors'
    }
  }

  // Verify that product exists
  const productExists = await productsRepository.existsById(id)

  if (!productExists) {
    return {
      success: false,
      data: undefined,
      errors: ['Product not found'],
      errorType: 'NOT_FOUND',
      message: 'Product could not be deleted due to verification errors'
    }
  }

  // Delete product
  try {
    await productsRepository.removeById(id)
  } catch {
    return {
      success: false,
      data: undefined,
      errors: ['Product could not be deleted because an unexpected error occurred'],
      errorType: 'UNEXPECTED',
      message: 'An error occurred while deleting the product'
    }
  }

  return {
    success: true,
    data: undefined,
    message: 'Product deleted successfully'
  }
}

async function updateProductPriceById(price: number, id: number): Promise<ServiceResult<void>> {
  // Validation
  const errors: string[] = [
    ...sharedValidator.validateId(id),
    ...productsValidator.validateProductPrice(price)
  ]

  if (errors.length) {
    return {
      success: false,
      data: undefined,
      errors,
      errorType: 'VALIDATION',
      message: 'Product price could not be updated due to validation errors'
    }
  }

  // Verify that product exists
  const productExists = await productsRepository.existsById(id)

  if (!productExists) {
    return {
      success: false,
      data: undefined,
      errors: ['Product not found'],
      errorType: 'NOT_FOUND',
      message: 'Product price could not be updated due to verification errors'
    }
  }

  // Update product price
  try {
    await productsRepository.updatePriceById(id, price)
  } catch {
    return {
      success: false,
      data: undefined,
      errors: ['Product price could not be updated because an unexpected error occurred'],
      errorType: 'UNEXPECTED',
      message: 'An error occurred while updating the product price'
    }
  }

  return {
    success: true,
    data: undefined,
    message: 'Product price updated successfully'
  }
}

async function updateProductQuantityById(
  quantity: number,
  id: number
): Promise<ServiceResult<void>> {
  // Validation
  const errors: string[] = [
    ...sharedValidator.validateId(id),
    ...productsValidator.validateProductQuantity(quantity)
  ]

  if (errors.length) {
    return {
      success: false,
      data: undefined,
      errors,
      errorType: 'VALIDATION',
      message: 'Product quantity could not be updated due to validation errors'
    }
  }

  // Verify that product exists
  const productExists = await productsRepository.existsById(id)

  if (!productExists) {
    return {
      success: false,
      data: undefined,
      errors: ['Product not found'],
      errorType: 'NOT_FOUND',
      message: 'Product quantity could not be updated due to verification errors'
    }
  }

  // Update product quantity
  try {
    await productsRepository.updateQuantityById(id, quantity)
  } catch {
    return {
      success: false,
      data: undefined,
      errors: ['Product quantity could not be updated because an unexpected error occurred'],
      errorType: 'UNEXPECTED',
      message: 'An error occurred while updating the product quantity'
    }
  }

  return {
    success: true,
    data: undefined,
    message: 'Product quantity updated successfully'
  }
}

export const productsService = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById,
  updateProductPriceById,
  updateProductQuantityById
}
