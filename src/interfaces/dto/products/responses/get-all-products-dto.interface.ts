export interface GetAllProductsResponseDto {
  products: {
    id: number
    name: string
    description: string
    price: number
    quantity: number
  }[]
}
