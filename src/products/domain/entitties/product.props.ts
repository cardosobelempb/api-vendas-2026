// domain/entities/product.props.ts
import { UUIDVO } from '@/common'

export interface ProductProps {
  id: UUIDVO
  name: string
  price: number
  quantity: number
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}
