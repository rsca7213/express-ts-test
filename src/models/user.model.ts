import { UserRole } from '../types/user.types'

export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  passwordHash: string
  role: UserRole
}
