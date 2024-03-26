import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10

function hashPassword(password: string): string {
  return bcrypt.hashSync(password, SALT_ROUNDS)
}

function comparePasswords(password: string, hashedPassword: string): boolean {
  return bcrypt.compareSync(password, hashedPassword)
}

export const passwordHashingUtil = {
  hashPassword,
  comparePasswords
}
