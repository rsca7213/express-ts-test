import { User } from '../../models/user.model'

let nextId = 1
const users: User[] = []

async function count(): Promise<number> {
  return users.length
}

async function getAll(): Promise<User[]> {
  return users
}

async function getRange(skip: number, take: number): Promise<User[]> {
  return users.slice(skip, skip + take)
}

async function getById(id: number): Promise<User | null> {
  return users.find(user => user.id === id) || null
}

async function getByEmail(email: string): Promise<User | null> {
  return users.find(user => user.email === email) || null
}

async function existsById(id: number): Promise<boolean> {
  return users.some(user => user.id === id)
}

async function existsByEmail(email: string): Promise<boolean> {
  return users.some(user => user.email === email)
}

async function existsByEmailExcludingId(id: number, email: string): Promise<boolean> {
  return users.some(user => user.id !== id && user.email === email)
}

async function create(user: Omit<User, 'id'>): Promise<void> {
  users.push({
    ...user,
    id: nextId++
  })
}

async function updateById(id: number, user: User): Promise<void> {
  const index = users.findIndex(user => user.id === id)
  users[index] = {
    ...user,
    id
  }
}

async function removeById(id: number): Promise<void> {
  const index = users.findIndex(user => user.id === id)
  users.splice(index, 1)
}

export const usersRepository = {
  count,
  getAll,
  getRange,
  getById,
  getByEmail,
  existsById,
  existsByEmail,
  existsByEmailExcludingId,
  create,
  updateById,
  removeById
}
