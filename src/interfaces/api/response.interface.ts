export interface ApiResponse<ResBody> {
  message: string
  data?: ResBody
  error?: string
  details?: string[]
}
