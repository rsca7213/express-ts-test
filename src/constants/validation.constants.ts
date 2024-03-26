import Joi from 'joi'
import { USER_ROLES } from './user-role.constants'

const USER_LIMITS = {
  FIRST_NAME_MIN: 3,
  FIRST_NAME_MAX: 50,
  LAST_NAME_MIN: 3,
  LAST_NAME_MAX: 50,
  EMAIL_MAX: 320,
  PASSWORD_MIN: 10,
  PASSWORD_MAX: 320
}

const PRODUCT_LIMITS = {
  NAME_MIN: 3,
  NAME_MAX: 50,
  DESCRIPTION_MIN: 10,
  DESCRIPTION_MAX: 1000,
  PRICE_MIN: 0.01,
  PRICE_MAX: 1000000,
  PRICE_PRECISION: 2,
  QUANTITY_MIN: 0,
  QUANTITY_MAX: 1000000
}

export const VALIDATION_RULES = {
  id: Joi.number().integer().positive().required().messages({
    'number.base': 'Id must be a number',
    'number.integer': 'Id must be an integer',
    'number.positive': 'Id must be a positive number',
    'any.required': 'Id is required'
  }),
  user: {
    firstName: Joi.string()
      .presence('required')
      .required()
      .min(USER_LIMITS.FIRST_NAME_MIN)
      .max(USER_LIMITS.FIRST_NAME_MAX)
      .messages({
        'any.required': 'First name is required',
        'string.base': 'First name must be a string',
        'string.empty': 'First name is required',
        'string.min': `First name must be at least ${USER_LIMITS.FIRST_NAME_MIN} characters long`,
        'string.max': `First name must be at most ${USER_LIMITS.FIRST_NAME_MAX} characters long`
      }),
    lastName: Joi.string()
      .presence('required')
      .required()
      .min(USER_LIMITS.LAST_NAME_MIN)
      .max(USER_LIMITS.LAST_NAME_MAX)
      .messages({
        'any.required': 'Last name is required',
        'string.base': 'Last name must be a string',
        'string.empty': 'Last name is required',
        'string.min': `Last name must be at least ${USER_LIMITS.LAST_NAME_MIN} characters long`,
        'string.max': `Last name must be at most ${USER_LIMITS.LAST_NAME_MAX} characters long`
      }),
    email: Joi.string()
      .presence('required')
      .email()
      .required()
      .max(USER_LIMITS.EMAIL_MAX)
      .messages({
        'any.required': 'Email is required',
        'string.base': 'Email must be a string',
        'string.empty': 'Email is required',
        'string.email': 'Email must be a valid email address',
        'string.max': `Email must be at most ${USER_LIMITS.EMAIL_MAX} characters long`
      }),
    role: Joi.string()
      .presence('required')
      .valid(...USER_ROLES)
      .required()
      .messages({
        'any.required': 'Role is required',
        'string.base': 'Role must be a string',
        'string.empty': 'Role is required',
        'any.only': `Role must be one of [${USER_ROLES.join(', ')}]`
      }),
    passwordHash: Joi.string().optional().empty(''),
    password: Joi.string()
      .presence('required')
      .required()
      .min(USER_LIMITS.PASSWORD_MIN)
      .max(USER_LIMITS.PASSWORD_MAX)
      .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])'))
      .messages({
        'any.required': 'Password is required',
        'string.base': 'Password must be a string',
        'string.empty': 'Password is required',
        'string.min': `Password must be at least ${USER_LIMITS.PASSWORD_MIN} characters long`,
        'string.max': `Password must be at most ${USER_LIMITS.PASSWORD_MAX} characters long`,
        'string.pattern.base':
          'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character'
      })
  },
  product: {
    name: Joi.string()
      .presence('required')
      .required()
      .min(PRODUCT_LIMITS.NAME_MIN)
      .max(PRODUCT_LIMITS.NAME_MAX)
      .messages({
        'any.required': 'Name is required',
        'string.base': 'Name must be a string',
        'string.empty': 'Name is required',
        'string.min': `Name must be at least ${PRODUCT_LIMITS.NAME_MIN} characters long`,
        'string.max': `Name must be at most ${PRODUCT_LIMITS.NAME_MAX} characters long`
      }),
    description: Joi.string()
      .presence('required')
      .required()
      .min(PRODUCT_LIMITS.DESCRIPTION_MIN)
      .max(PRODUCT_LIMITS.DESCRIPTION_MAX)
      .messages({
        'any.required': 'Description is required',
        'string.base': 'Description must be a string',
        'string.empty': 'Description is required',
        'string.min': `Description must be at least ${PRODUCT_LIMITS.DESCRIPTION_MIN} characters long`,
        'string.max': `Description must be at most ${PRODUCT_LIMITS.DESCRIPTION_MAX} characters long`
      }),
    price: Joi.number()
      .presence('required')
      .required()
      .precision(PRODUCT_LIMITS.PRICE_PRECISION)
      .min(PRODUCT_LIMITS.PRICE_MIN)
      .max(PRODUCT_LIMITS.PRICE_MAX)
      .messages({
        'any.required': 'Price is required',
        'number.base': 'Price must be a number',
        'number.empty': 'Price is required',
        'number.precision': `Price must have at most ${PRODUCT_LIMITS.PRICE_PRECISION} decimal places`,
        'number.min': `Price must be at least ${PRODUCT_LIMITS.PRICE_MIN}`,
        'number.max': `Price must be at most ${PRODUCT_LIMITS.PRICE_MAX}`
      }),
    quantity: Joi.number()
      .presence('required')
      .required()
      .integer()
      .min(PRODUCT_LIMITS.QUANTITY_MIN)
      .max(PRODUCT_LIMITS.QUANTITY_MAX)
      .messages({
        'any.required': 'Quantity is required',
        'number.base': 'Quantity must be a number',
        'number.empty': 'Quantity is required',
        'number.integer': 'Quantity must be an integer',
        'number.min': `Quantity must be at least ${PRODUCT_LIMITS.QUANTITY_MIN}`,
        'number.max': `Quantity must be at most ${PRODUCT_LIMITS.QUANTITY_MAX}`
      })
  }
}
