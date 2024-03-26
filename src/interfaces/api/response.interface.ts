import { Pagination } from '../services/pagination.interface'

export interface ApiResponse<ResBody> {
  success: boolean
  message: string
  data?: ResBody
  error?: string
  details?: string[]
  pagination?: Pagination
}
