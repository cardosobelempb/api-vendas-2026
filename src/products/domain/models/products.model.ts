export interface ProductModel {
  id: string
  name: string
  price: number
  quantity: number
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date | null // registros não deletados
}
