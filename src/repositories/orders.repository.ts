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
  // include orderProducts and include products inside orderProducts
  const pOrders = await prisma.order.findMany({
    include: {
      orderProducts: {
        include: {
          product: true
        }
      }
    }
  })

  return pOrders.map(pOrder => {
    return {
      ...pOrder,
      status: pOrder.status as OrderStatus
    }
  })
}

async function getRange(skip: number, take: number): Promise<Order[]> {
  const pOrders = await prisma.order.findMany({
    skip,
    take,
    include: {
      orderProducts: {
        include: {
          product: true
        }
      }
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
      orderProducts: {
        include: {
          product: true
        }
      }
    }
  })

  return pOrders.map(pOrder => {
    return {
      ...pOrder,
      status: pOrder.status as OrderStatus
    }
  })
}

async function getRangeByUserId(userId: number, skip: number, take: number): Promise<Order[]> {
  const pOrders = await prisma.order.findMany({
    where: {
      userId
    },
    skip,
    take,
    include: {
      orderProducts: {
        include: {
          product: true
        }
      }
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
      orderProducts: {
        include: {
          product: true
        }
      }
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

async function create(order: Omit<Order, 'id'>): Promise<void> {
  await prisma.order.create({
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
  await prisma.orderProduct.deleteMany({
    where: {
      orderId: id
    }
  })
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

async function updateOrderLastUpdateById(id: number, lastUpdate: Date): Promise<void> {
  await prisma.order.update({
    where: {
      id
    },
    data: {
      lastUpdate
    }
  })
}

export const ordersRepository = {
  count,
  countByUserId,
  getAll,
  getRange,
  getAllByUserId,
  getRangeByUserId,
  getById,
  existsById,
  create,
  removeById,
  updateOrderStatusById,
  updateOrderLastUpdateById
}
