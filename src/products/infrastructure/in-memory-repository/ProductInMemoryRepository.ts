import { ErrorCode, InMemoryRepository, NotFoundError } from '@/common'
import { ProductModel } from '@/products/domain/models/products.model'
import {
  ProductId,
  ProductRepository,
} from '@/products/domain/repositories/ProductRespository'

import { ProductEntity } from '../typeorm/entities/product.entity'

export class ProductInMemoryRepository
  extends InMemoryRepository<ProductEntity>
  implements ProductRepository
{
  protected sortableFields: (keyof ProductEntity)[] = ['name', 'createdAt']

  async findByName(name: string): Promise<ProductModel> {
    const entity = this.items.find(item => item.name === name)
    if (!entity) {
      throw new NotFoundError(`${ErrorCode.NOT_FOUND} name ${name}`)
    }
    return entity
  }
  async findAllByIds(productIds: ProductId[]): Promise<ProductModel[]> {
    // Converte os IDs para um Set para busca eficiente
    const ids = new Set(productIds.map(productId => productId.id))

    // Filtra apenas os produtos existentes
    return this.items.filter(item => ids.has(item.id))
  }
  async conflictngName(name: string): Promise<void> {
    const entity = this.items.find(item => item.name === name)
    if (!entity) {
      throw new NotFoundError(ErrorCode.NOT_FOUND)
    }
  }
  protected async applyFilter(
    items: ProductEntity[],
    filter?: string,
  ): Promise<ProductEntity[]> {
    throw new Error('Method not implemented.')
  }
}
