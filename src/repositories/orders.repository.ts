import { PrismaClient } from '@prisma/client'
import { Order } from '../models/order.model'
import { OrderStatus } from '../types/order.types'

const prisma = new PrismaClient()

async function count(): Promise<number> {
  return await prisma.order.count()
}

async function countByUserId(userId: number): Promise<number> {
  return await prisma.order.count({
    where: {
      userId
    }
  })
}

async function getAll(): Promise<Order[]> {
  const pOrders = await prisma.order.findMany({
    include: {
      orderProducts: true
    }
  })

  return pOrders.map(pOrder => {
    return {
      ...pOrder,
      status: pOrder.status as OrderStatus
    }
  })
}

async function getAllByUserId(userId: number): Promise<Order[]> {
  const pOrders = await prisma.order.findMany({
    where: {
      userId
    },
    include: {
      orderProducts: true
    }
  })

  return pOrders.map(pOrder => {
    return {
      ...pOrder,
      status: pOrder.status as OrderStatus
    }
  })
}

async function getById(id: number): Promise<Order | null> {
  const pOrder = await prisma.order.findUnique({
    where: {
      id
    },
    include: {
      orderProducts: true
    }
  })

  if (!pOrder) return null

  return {
    ...pOrder,
    status: pOrder.status as OrderStatus
  }
}

async function existsById(id: number): Promise<boolean> {
  return Boolean(
    await prisma.order.findUnique({
      where: {
        id
      }
    })
  )
}

async function create(order: Order): Promise<void> {
  await prisma.order.create({
    data: {
      id: order.id,
      userId: order.userId,
      status: order.status,
      orderProducts: {
        create: order.orderProducts
      },
      orderDate: order.orderDate,
      lastUpdate: order.lastUpdate
    }
  })
}

async function updateById(id: number, order: Order): Promise<void> {
  await prisma.order.update({
    where: {
      id
    },
    data: {
      userId: order.userId,
      status: order.status,
      orderProducts: {
        create: order.orderProducts
      },
      orderDate: order.orderDate,
      lastUpdate: order.lastUpdate
    }
  })
}

async function removeById(id: number): Promise<void> {
  await prisma.order.delete({
    where: {
      id
    }
  })
}

async function updateOrderStatusById(id: number, status: OrderStatus): Promise<void> {
  await prisma.order.update({
    where: {
      id
    },
    data: {
      status
    }
  })
}

export const ordersRepository = {
  count,
  countByUserId,
  getAll,
  getAllByUserId,
  getById,
  existsById,
  create,
  updateById,
  removeById,
  updateOrderStatusById
}
