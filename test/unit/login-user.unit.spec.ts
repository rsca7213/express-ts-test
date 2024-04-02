import { usersRepository } from '../../src/repositories/users.repository'
import { authService } from '../../src/services/auth.service'
import { passwordHashingUtil } from '../../src/utils/password-hashing.util'

jest.mock('../../src/repositories/users.repository.ts')
jest.mock('../../src/utils/auth-token.util.ts')
jest.mock('../../src/utils/password-hashing.util.ts')

const userLoginData = {
  email: 'johndoe@gmail.com',
  password: 'Password123***'
}

beforeEach(() => {
  jest.clearAllMocks()

  usersRepository.create({
    email: userLoginData.email,
    firstName: 'John',
    lastName: 'Doe',
    passwordHash: passwordHashingUtil.hashPassword(userLoginData.password),
    role: 'User'
  })
})

describe('[AuthService] User login tests', () => {
  it('Should return a token when user logs in successfully', async () => {
    const result = await authService.login(userLoginData.email, userLoginData.password)

    expect(result.success).toBe(true)
    expect(result.data?.token).toBeTruthy()
  })

  it('Should return an error when user logs in with invalid password', async () => {
    const result = await authService.login(userLoginData.email, 'InvalidPassword123***')

    expect(result.success).toBe(false)
    expect(result.errors).toStrictEqual(['Incorrect password'])
  })

  it('Should return an error when user logs in with invalid email', async () => {
    const result = await authService.login('invalid@gmail.com', userLoginData.password)

    expect(result.success).toBe(false)
    expect(result.errors).toStrictEqual(['User not found'])
  })

  it('Should return an error when data is invalid', async () => {
    const result = await authService.login('invalid-email', 'short')

    expect(result.success).toBe(false)
    expect(result.errors).toStrictEqual([
      'Email must be a valid email address',
      'Password must be at least 10 characters long',
      'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character'
    ])
  })
})
