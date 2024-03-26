import Joi from 'joi'
import { Product } from '../models/product.model'
import { VALIDATION_RULES } from '../constants/validation.constants'

function validateProductFields(product: Omit<Product, 'id'>): string[] {
  const schema = Joi.object<Product>({
    name: VALIDATION_RULES.product.name,
    description: VALIDATION_RULES.product.description,
    price: VALIDATION_RULES.product.price,
    quantity: VALIDATION_RULES.product.quantity
  })

  const { error } = schema.validate(product, { abortEarly: false, convert: false })

  return error?.details.map(error => error.message) || []
}

function validateProductPrice(price: number): string[] {
  const schema = VALIDATION_RULES.product.price

  const { error } = schema.validate(price, { abortEarly: false, convert: false })

  return error?.details.map(error => error.message) || []
}

function validateProductQuantity(quantity: number): string[] {
  const schema = VALIDATION_RULES.product.quantity

  const { error } = schema.validate(quantity, { abortEarly: false, convert: false })

  return error?.details.map(error => error.message) || []
}

export const productsValidator = {
  validateProductFields,
  validateProductPrice,
  validateProductQuantity
}
