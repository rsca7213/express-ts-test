import { ServiceError } from '../../types/service-error.types'
import { Pagination } from './pagination.interface'

export interface ServiceResult<T> {
  success: boolean
  message: string
  data: T
  errorType?: ServiceError
  errors?: string[]
  pagination?: Pagination
}
