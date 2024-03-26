import { Router } from 'express'

export const orderRouter = Router()

orderRouter.get('', () => {})
orderRouter.get(':id', () => {})
orderRouter.get('/user/:id', () => {})
orderRouter.post('', () => {})
orderRouter.put(':id', () => {})
orderRouter.delete(':id', () => {})
orderRouter.patch(':id/status', () => {})
