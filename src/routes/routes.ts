import { Router } from 'express'
import { userRouter } from './user.routes'
import { authRouter } from './auth.routes'
import { productRouter } from './product.routes'
import { orderRouter } from './order.routes'
import { resultMiddleware } from '../middlewares/result.middleware'
import { requestBodyMiddleware } from '../middlewares/request-body.middleware'

export const router = Router()

// Before route middlewares
router.use(requestBodyMiddleware)

// Routes
router.use('/auth', authRouter)
router.use('/users', userRouter)
router.use('/products', productRouter)
router.use('/orders', orderRouter)

// After route middlewares
router.use(resultMiddleware)
