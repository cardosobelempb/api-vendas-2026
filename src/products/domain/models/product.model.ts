import { UUIDVO } from '@/common'

export interface ProductModel {
  id: UUIDVO
  name: string
  price: number
  quantity: number
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null // registros não deletados
}
