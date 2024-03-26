import { ServiceError } from '../../types/service-error.types'

export interface ServiceResult<T> {
  success: boolean
  message: string
  data: T
  errorType?: ServiceError
  errors?: string[]
}
