import { ServiceResult } from '../interfaces/services/service-result.interface'
import { User } from '../models/user.model'
import { usersRepository } from '../repositories/users.repository'
import { passwordHashingUtil } from '../utils/password-hashing.util'
import { sharedValidator } from '../validators/shared.validator'
import { usersValidator } from '../validators/users.validator'

async function getAllUsers(): Promise<ServiceResult<User[]>> {
  const users = await usersRepository.getAll()

  return {
    success: true,
    data: users,
    message: 'Users retrieved successfully'
  }
}

async function getUserById(id: number): Promise<ServiceResult<User | null>> {
  // Validation
  const errors: string[] = sharedValidator.validateId(id)

  if (errors.length) {
    return {
      success: false,
      data: null,
      errors,
      errorType: 'VALIDATION',
      message: 'User could not be retrieved due to validation errors'
    }
  }

  // Get user
  const user = await usersRepository.getById(id)

  if (!user) {
    return {
      success: false,
      data: null,
      errors: ['User not found'],
      errorType: 'NOT_FOUND',
      message: 'User could not be retrieved due to verification errors'
    }
  }

  return {
    success: true,
    data: user,
    message: 'User retrieved successfully'
  }
}

async function createUser(
  user: Omit<User, 'id' | 'passwordHash'>,
  password: string
): Promise<ServiceResult<void>> {
  // Validation
  const errors: string[] = usersValidator.validateUserFieldsWithPassword(user, password)

  if (errors.length) {
    return {
      success: false,
      data: undefined,
      errors,
      errorType: 'VALIDATION',
      message: 'User could not be created due to validation errors'
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
      message: 'User could not be created due to verification errors'
    }
  }

  const userToSave: Omit<User, 'id'> = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    passwordHash: passwordHashingUtil.hashPassword(password)
  }

  // Create user
  try {
    await usersRepository.create(userToSave)
  } catch (error) {
    return {
      success: false,
      data: undefined,
      errors: ['User could not be created because an unexpected error occurred'],
      errorType: 'UNEXPECTED',
      message: 'An error occurred while creating the user'
    }
  }

  return {
    success: true,
    data: undefined,
    message: 'User created successfully'
  }
}

async function updateUserById(
  id: number,
  user: Omit<User, 'id' | 'passwordHash'>,
  password: string
): Promise<ServiceResult<void>> {
  // Validation
  const errors: string[] = usersValidator.validateUserFieldsWithPassword(user, password)

  if (errors.length) {
    return {
      success: false,
      data: undefined,
      errors,
      errorType: 'VALIDATION',
      message: 'User could not be updated due to validation errors'
    }
  }

  // Verify user exists
  const userExists = await usersRepository.existsById(id)

  if (!userExists) {
    return {
      success: false,
      data: undefined,
      errors: ['User not found'],
      errorType: 'NOT_FOUND',
      message: 'User could not be updated due to verification errors'
    }
  }

  // Verify that user by the same email does not already exist
  const userByEmail = await usersRepository.existsByEmailExcludingId(id, user.email)

  if (userByEmail) {
    return {
      success: false,
      data: undefined,
      errors: ['User with the same email already exists'],
      errorType: 'ALREADY_EXISTS',
      message: 'User could not be updated due to verification errors'
    }
  }

  const userToSave: Omit<User, 'id'> = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    passwordHash: passwordHashingUtil.hashPassword(password)
  }

  // Update user
  try {
    await usersRepository.updateById(id, userToSave)
  } catch {
    return {
      success: false,
      data: undefined,
      errors: ['User could not be updated because an unexpected error occurred'],
      errorType: 'UNEXPECTED',
      message: 'An error occurred while updating the user'
    }
  }

  return {
    success: true,
    data: undefined,
    message: 'User updated successfully'
  }
}

async function deleteUserById(id: number): Promise<ServiceResult<void>> {
  // Validation
  const errors: string[] = sharedValidator.validateId(id)

  if (errors.length) {
    return {
      success: false,
      data: undefined,
      errors,
      errorType: 'VALIDATION',
      message: 'User could not be deleted due to validation errors'
    }
  }

  // Verify user exists
  const userExists = await usersRepository.existsById(id)

  if (!userExists) {
    return {
      success: false,
      data: undefined,
      errors: ['User not found'],
      errorType: 'NOT_FOUND',
      message: 'User could not be deleted due to verification errors'
    }
  }

  // Delete user
  try {
    await usersRepository.removeById(id)
  } catch {
    return {
      success: false,
      data: undefined,
      errors: ['User could not be deleted because an unexpected error occurred'],
      errorType: 'UNEXPECTED',
      message: 'An error occurred while deleting the user'
    }
  }

  return {
    success: true,
    data: undefined,
    message: 'User deleted successfully'
  }
}

export const usersService = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById
}
