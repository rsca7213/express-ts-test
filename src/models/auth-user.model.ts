import { UserRole } from '../types/user.types'

export interface AuthUser {
  id: number
  email: string
  role: UserRole
}
