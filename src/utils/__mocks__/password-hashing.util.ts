function hashPassword(password: string): string {
  return `mock-hash-${password}`
}

function comparePasswords(password: string, hashedPassword: string): boolean {
  return `mock-hash-${password}` === hashedPassword
}

export const passwordHashingUtil = {
  hashPassword,
  comparePasswords
}
