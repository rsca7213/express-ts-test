export interface CreateOrderRequestDto {
  products: {
    id: number
    quantity: number
  }[]
}
