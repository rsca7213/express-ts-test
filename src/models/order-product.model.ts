import { Product } from './product.model'

export interface OrderProduct {
  orderId: number
  productId: number
  quantity: number
  unitPrice: number
  product: Product
}
