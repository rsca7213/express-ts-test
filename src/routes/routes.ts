import { Router } from 'express'
import { userRouter } from './user.routes'
import { authRouter } from './auth.routes'
import { productRouter } from './product.routes'
import { orderRouter } from './order.routes'

export const router = Router()

// Routes
router.use('/auth', authRouter)
router.use('/users', userRouter)
router.use('/products', productRouter)
router.use('/orders', orderRouter)
