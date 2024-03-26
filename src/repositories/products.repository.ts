import { PrismaClient } from '@prisma/client'
import { Product } from '../models/product.model'

const prisma = new PrismaClient()

async function count(): Promise<number> {
  return await prisma.product.count()
}

async function getAll(): Promise<Product[]> {
  return await prisma.product.findMany()
}

async function getRange(skip: number, take: number): Promise<Product[]> {
  return await prisma.product.findMany({
    skip,
    take
  })
}

async function getById(id: number): Promise<Product | null> {
  return await prisma.product.findUnique({
    where: {
      id
    }
  })
}

async function getByName(name: string): Promise<Product | null> {
  return await prisma.product.findUnique({
    where: {
      name
    }
  })
}

async function existsById(id: number): Promise<boolean> {
  return Boolean(
    await prisma.product.findUnique({
      where: {
        id
      }
    })
  )
}

async function existsByName(name: string): Promise<boolean> {
  return Boolean(
    await prisma.product.findUnique({
      where: {
        name
      }
    })
  )
}

async function create(product: Product): Promise<void> {
  await prisma.product.create({
    data: product
  })
}

async function updateById(id: number, product: Product): Promise<void> {
  await prisma.product.update({
    where: {
      id
    },
    data: product
  })
}

async function removeById(id: number): Promise<void> {
  await prisma.product.delete({
    where: {
      id
    }
  })
}

async function updateQuantityById(id: number, quantity: number): Promise<void> {
  await prisma.product.update({
    where: {
      id
    },
    data: {
      quantity
    }
  })
}

async function updatePriceById(id: number, price: number): Promise<void> {
  await prisma.product.update({
    where: {
      id
    },
    data: {
      price
    }
  })
}

export const productsRepository = {
  count,
  getAll,
  getRange,
  getById,
  getByName,
  existsById,
  existsByName,
  create,
  updateById,
  removeById,
  updateQuantityById,
  updatePriceById
}
