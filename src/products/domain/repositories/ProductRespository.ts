import { SearchableRepository } from '@/common'

import { ProductModel } from '../models/products.model'

export type ProductId = {
  id: string
}
export type ProductCreateProps = {
  id: string
  name: string
  price: number
  quantity: number
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date | null // registros não deletados
}

export abstract class ProductRepository extends SearchableRepository<ProductModel> {
  abstract findByName(name: string): Promise<ProductModel>
  abstract findAllByIds(productIds: ProductId[]): Promise<ProductModel[]>
  abstract conflictngName(name: string): Promise<void>
}
