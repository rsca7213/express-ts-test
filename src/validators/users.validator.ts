import Joi from 'joi'
import { User } from '../models/user.model'
import { VALIDATION_RULES } from '../constants/validation.constants'

function validateUserFieldsWithPassword(
  user: Omit<User, 'id' | 'passwordHash'>,
  password: string
): string[] {
  const schema = Joi.object<User & { password: string }>({
    firstName: VALIDATION_RULES.user.firstName,
    lastName: VALIDATION_RULES.user.lastName,
    email: VALIDATION_RULES.user.email,
    role: VALIDATION_RULES.user.role,
    passwordHash: Joi.string().optional().empty(''),
    password: VALIDATION_RULES.user.password
  })

  const { error } = schema.validate({ ...user, password }, { abortEarly: false, convert: false })

  return error?.details.map(error => error.message) || []
}

function validateUserFieldsWithoutPassword(user: Omit<User, 'id' | 'passwordHash'>): string[] {
  const schema = Joi.object<User>({
    firstName: VALIDATION_RULES.user.firstName,
    lastName: VALIDATION_RULES.user.lastName,
    email: VALIDATION_RULES.user.email,
    role: VALIDATION_RULES.user.role,
    passwordHash: Joi.string().optional().empty('')
  })

  const { error } = schema.validate(user, { abortEarly: false, convert: false })

  return error?.details.map(error => error.message) || []
}

export const usersValidator = {
  validateUserFieldsWithPassword,
  validateUserFieldsWithoutPassword
}
