import { UserRole } from '../../../types/user.types'

export interface CreateUserRequestDto {
  firstName: string
  lastName: string
  email: string
  password: string
  role: UserRole
}
