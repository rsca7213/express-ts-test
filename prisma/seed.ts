import { PrismaClient, Product, User } from '@prisma/client'
import bcrypt from 'bcrypt'

export const usersToSeed: User[] = [
  {
    id: 1,
    email: 'john.admin@email.com',
    firstName: 'John',
    lastName: 'Doe',
    passwordHash: bcrypt.hashSync('Admin123456*', 10),
    role: 'Administrator'
  },
  {
    id: 2,
    email: 'jane.user@email.com',
    firstName: 'Jane',
    lastName: 'Doe',
    passwordHash: bcrypt.hashSync('User123456*', 10),
    role: 'User'
  },
  {
    id: 3,
    email: 'joe.user@email.com',
    firstName: 'Joe',
    lastName: 'Doe',
    passwordHash: bcrypt.hashSync('User123456*', 10),
    role: 'User'
  }
]

export const productsToSeed: Product[] = [
  {
    id: 1,
    name: 'Apple',
    description: 'A fruit that is red or green',
    price: 1.5,
    quantity: 100
  },
  {
    id: 2,
    name: 'Banana',
    description: 'A fruit that is yellow',
    price: 2.5,
    quantity: 150
  },
  {
    id: 3,
    name: 'Orange',
    description: 'A fruit that is orange',
    price: 3.5,
    quantity: 200
  },
  {
    id: 4,
    name: 'Pineapple',
    description: 'A fruit that is yellow and brown',
    price: 4.5,
    quantity: 250
  },
  {
    id: 5,
    name: 'Strawberry',
    description: 'A fruit that is red',
    price: 5.5,
    quantity: 300
  }
]

const prisma = new PrismaClient()

async function main() {
  for (const user of usersToSeed) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: user
    })
  }

  for (const product of productsToSeed) {
    await prisma.product.upsert({
      where: { id: product.id },
      update: {},
      create: product
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
