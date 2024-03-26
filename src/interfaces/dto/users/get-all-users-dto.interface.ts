export interface GetAllUsersResponseDto {
  users: {
    id: number
    email: string
    firstName: string
    lastName: string
    role: string
  }[]
}
