import { VALIDATION_RULES } from '../constants/validation.constants'

function validateId(id: number): string[] {
  const schema = VALIDATION_RULES.id

  const { error } = schema.validate(id, { abortEarly: false })

  return error?.details.map(error => error.message) || []
}

export const sharedValidator = {
  validateId
}
