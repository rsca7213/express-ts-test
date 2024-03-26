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

export const VALIDATION_RULES = {
  id: Joi.number().integer().positive().required().messages({
    'number.base': 'Id must be a number',
    'number.integer': 'Id must be an integer',
    'number.positive': 'Id must be a positive number',
    'any.required': 'Id is required'
  }),
  user: {
    firstName: Joi.string()
      .required()
      .min(USER_LIMITS.FIRST_NAME_MIN)
      .max(USER_LIMITS.FIRST_NAME_MAX)
      .messages({
        'string.base': 'First name must be a string',
        'string.empty': 'First name is required',
        'string.min': `First name must be at least ${USER_LIMITS.FIRST_NAME_MIN} characters long`,
        'string.max': `First name must be at most ${USER_LIMITS.FIRST_NAME_MAX} characters long`
      }),
    lastName: Joi.string()
      .required()
      .min(USER_LIMITS.LAST_NAME_MIN)
      .max(USER_LIMITS.LAST_NAME_MAX)
      .messages({
        'string.base': 'Last name must be a string',
        'string.empty': 'Last name is required',
        'string.min': `Last name must be at least ${USER_LIMITS.LAST_NAME_MIN} characters long`,
        'string.max': `Last name must be at most ${USER_LIMITS.LAST_NAME_MAX} characters long`
      }),
    email: Joi.string()
      .email()
      .required()
      .max(USER_LIMITS.EMAIL_MAX)
      .messages({
        'string.base': 'Email must be a string',
        'string.empty': 'Email is required',
        'string.email': 'Email must be a valid email address',
        'string.max': `Email must be at most ${USER_LIMITS.EMAIL_MAX} characters long`
      }),
    role: Joi.string()
      .valid(...USER_ROLES)
      .required()
      .messages({
        'string.base': 'Role must be a string',
        'string.empty': 'Role is required',
        'any.only': `Role must be one of [${USER_ROLES.join(', ')}]`
      }),
    passwordHash: Joi.string().optional().empty(''),
    password: Joi.string()
      .required()
      .min(USER_LIMITS.PASSWORD_MIN)
      .max(USER_LIMITS.PASSWORD_MAX)
      .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])'))
      .messages({
        'string.base': 'Password must be a string',
        'string.empty': 'Password is required',
        'string.min': `Password must be at least ${USER_LIMITS.PASSWORD_MIN} characters long`,
        'string.max': `Password must be at most ${USER_LIMITS.PASSWORD_MAX} characters long`,
        'string.pattern.base':
          'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character'
      })
  }
}
