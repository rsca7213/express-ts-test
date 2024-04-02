import { AuthUser } from '../../models/auth-user.model'
import { UserRole } from '../../types/user.types'

function createToken(payload: AuthUser): string {
  return `mocked-token-${payload.email}-${payload.role}-${payload.id}`
}

function verifyToken(token: string): AuthUser {
  const tokenParts = token.split('-')

  return {
    email: tokenParts[2],
    role: tokenParts[3] as UserRole,
    id: parseInt(tokenParts[4])
  }
}

export const authTokenUtil = {
  createToken,
  verifyToken
}
