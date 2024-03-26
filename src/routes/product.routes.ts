import { Router } from 'express'

export const productRouter = Router()

productRouter.get('', () => {})
productRouter.get(':id', () => {})
productRouter.post('', () => {})
productRouter.put(':id', () => {})
productRouter.delete(':id', () => {})
productRouter.patch(':id/quantity', () => {})
productRouter.patch(':id/price', () => {})
