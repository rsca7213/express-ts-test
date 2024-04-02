import request from 'supertest'
import { app, server } from '../../src/server'
import { HttpCodes } from '../../src/types/http-codes.types'

jest.mock('../../src/repositories/users.repository.ts')

const validUser = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'johndoe@gmail.com',
  password: 'Password123***'
}

beforeEach(() => {
  jest.clearAllMocks()
})

afterAll(() => {
  server.close()
})

describe('[Auth] User creates a new account and logs in', () => {
  it('should create a new user account and login afterwards', async () => {
    const registerReponse = await request(app).post('/api/auth/register').send(validUser)
    expect(registerReponse.status).toBe(HttpCodes.OK)
    expect(registerReponse.body).toHaveProperty('message', 'User registered successfully')

    const loginResponse = await request(app).post('/api/auth/login').send({
      email: validUser.email,
      password: validUser.password
    })

    expect(loginResponse.status).toBe(HttpCodes.OK)
    expect(loginResponse.body).toHaveProperty('message', 'User logged in successfully')
    expect(loginResponse.body.data).toHaveProperty('token')
    expect(loginResponse.body.data.token).toBeTruthy()
  })

  it('should not create a new user account if email is already taken', async () => {
    const registerReponse = await request(app).post('/api/auth/register').send(validUser)
    expect(registerReponse.status).toBe(HttpCodes.CONFLICT)
    expect(registerReponse.body).toHaveProperty('details', [
      'User with the same email already exists'
    ])
  })

  it('should not login if email is not found', async () => {
    const loginResponse = await request(app).post('/api/auth/login').send({
      email: 'notfound@gmail.com',
      password: 'Password123***'
    })

    expect(loginResponse.status).toBe(HttpCodes.NOT_FOUND)
    expect(loginResponse.body).toHaveProperty('details', ['User not found'])
  })

  it('should not login if password is incorrect', async () => {
    const loginResponse = await request(app).post('/api/auth/login').send({
      email: validUser.email,
      password: 'Incorrectpassword123*'
    })

    expect(loginResponse.status).toBe(HttpCodes.UNAUTHORIZED)
    expect(loginResponse.body).toHaveProperty('details', ['Incorrect password'])
  })

  it('Should not register a user because of a validation error', async () => {
    const registerReponse = await request(app)
      .post('/api/auth/register')
      .send({
        ...validUser,
        email: 'johndoe@@gmail.com',
        password: 'password123*'
      })
    expect(registerReponse.status).toBe(HttpCodes.BAD_REQUEST)
    expect(registerReponse.body).toHaveProperty('details', [
      'Email must be a valid email address',
      'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character'
    ])
  })
})
