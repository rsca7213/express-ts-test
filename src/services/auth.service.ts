import { ServiceResult } from '../interfaces/services/service-result.interface'
import { AuthUser } from '../models/auth-user.model'
import { User } from '../models/user.model'
import { usersRepository } from '../repositories/users.repository'
import { authTokenUtil } from '../utils/auth-token.util'
import { passwordHashingUtil } from '../utils/password-hashing.util'
import { usersValidator } from '../validators/users.validator'

async function login(
  email: string,
  password: string
): Promise<ServiceResult<{ token: string } | null>> {
  // Validation
  const errors: string[] = usersValidator.validateCredentials(email, password)

  if (errors.length) {
    return {
      success: false,
      data: null,
      errors,
      errorType: 'VALIDATION',
      message: 'User could not be logged in due to validation errors'
    }
  }

  // Get user by email
  const user = await usersRepository.getByEmail(email)

  if (!user) {
    return {
      success: false,
      data: null,
      errors: ['User not found'],
      errorType: 'NOT_FOUND',
      message: 'User could not be logged in due to verification errors'
    }
  }

  // Check password
  const passwordMatch = passwordHashingUtil.comparePasswords(password, user.passwordHash)

  if (!passwordMatch) {
    return {
      success: false,
      data: null,
      errors: ['Incorrect password'],
      errorType: 'AUTHENTICATION',
      message: 'User could not be logged in due to authentication errors'
    }
  }

  const authUser: AuthUser = {
    id: user.id,
    email: user.email,
    role: user.role
  }

  const token = authTokenUtil.createToken(authUser)

  return {
    success: true,
    data: { token },
    message: 'User logged in successfully'
  }
}

async function registerUser(
  data: Omit<User, 'id' | 'passwordHash' | 'role'>,
  password: string
): Promise<ServiceResult<void>> {
  const user: Omit<User, 'id' | 'passwordHash'> = {
    ...data,
    role: 'User'
  }

  // Validation
  const errors: string[] = usersValidator.validateUserFieldsWithPassword(user, password)

  if (errors.length) {
    return {
      success: false,
      data: undefined,
      errors,
      errorType: 'VALIDATION',
      message: 'User could not be registered due to validation errors'
    }
  }

  // Verify that user by the same email does not already exist
  const userExists = await usersRepository.existsByEmail(user.email)

  if (userExists) {
    return {
      success: false,
      data: undefined,
      errors: ['User with the same email already exists'],
      errorType: 'ALREADY_EXISTS',
      message: 'User could not be registered due to verification errors'
    }
  }

  const userToSave: Omit<User, 'id'> = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    passwordHash: passwordHashingUtil.hashPassword(password)
  }

  // Save user
  try {
    await usersRepository.create(userToSave)
  } catch {
    return {
      success: false,
      data: undefined,
      errors: ['Error while saving user'],
      errorType: 'UNEXPECTED',
      message: 'User could not be registered due to an unexpected error'
    }
  }

  return {
    success: true,
    data: undefined,
    message: 'User registered successfully'
  }
}

export const authService = {
  login,
  registerUser
}
