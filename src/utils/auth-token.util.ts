import { sign, verify } from 'jsonwebtoken'
import { appConfig } from '../config/app.config'
import { AuthUser } from '../models/auth-user.model'

function createToken(payload: AuthUser): string {
  const jwt = sign(payload, appConfig.jwt.secret, {
    expiresIn: `${appConfig.jwt.expiration_hours}h`
  })

  return jwt
}

function verifyToken(token: string): AuthUser {
  return verify(token, appConfig.jwt.secret) as AuthUser
}

export const authTokenUtil = {
  createToken,
  verifyToken
}
