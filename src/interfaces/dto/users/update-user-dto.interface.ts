import { UserRole } from '../../../types/user.types'

export interface UpdateUserRequestDto {
  firstName: string
  lastName: string
  email: string
  password: string
  role: UserRole
}
