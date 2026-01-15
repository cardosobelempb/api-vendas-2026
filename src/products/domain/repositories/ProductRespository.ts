import { RepositoryDomain, UUIDVO } from '@/common'
import { ProductModel } from '../models/product.model'

export type ProductId = {
  id: UUIDVO
}
export type ProductCreateProps = {
  id: UUIDVO
  name: string
  price: number
  quantity: number
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date | null // registros não deletados
}

export abstract class ProductRepository extends RepositoryDomain<ProductModel> {
  abstract findByName(name: string): Promise<ProductModel>
  abstract findAllByIds(productIds: ProductId[]): Promise<ProductModel[]>
  abstract conflictngName(name: string): Promise<void>
}
