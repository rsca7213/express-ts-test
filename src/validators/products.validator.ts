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

  const { error } = schema.validate(product, { abortEarly: false })

  return error?.details.map(error => error.message) || []
}

export const productsValidator = {
  validateProductFields
}
