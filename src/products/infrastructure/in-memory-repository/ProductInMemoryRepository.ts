import {
  ConflictError,
  ErrorCode,
  NotFoundError,
  RepositoryInMemory,
} from '@/common'
import { ProductId, ProductModel, ProductRepository } from '@/products/domain'

export class ProductInMemoryRepository
  extends RepositoryInMemory<ProductModel>
  implements ProductRepository
{
  protected sortableFields: (keyof ProductModel)[] = ['name', 'createdAt']

  async findByName(name: string): Promise<ProductModel> {
    const product = this.items.find(item => item.name === name)
    if (!product) {
      throw new NotFoundError(`${ErrorCode.NOT_FOUND} ${name}`)
    }
    return product
  }
  async findAllByIds(productIds: ProductId[]): Promise<ProductModel[]> {
    // Converte os IDs para um Set para busca eficiente
    const ids = new Set(productIds.map(productId => productId.id))

    // Filtra apenas os produtos existentes
    return this.items.filter(item => ids.has(item.id))
  }
  async conflictngName(name: string): Promise<void> {
    const product = this.items.find(item => item.name === name)
    if (product) {
      throw new ConflictError(`${ErrorCode.CONFLICT_ERROR} ${name}`)
    }
  }
  protected async applyFilter(
    items: ProductModel[],
    filter?: string,
  ): Promise<ProductModel[]> {
    if (!filter) return items
    return items.filter(item =>
      item.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()),
    )
  }

  protected applySort(
    items: ProductModel[],
    sortBy?: keyof ProductModel | undefined,
    sortDirection?: 'asc' | 'desc',
  ): ProductModel[] {
    return super.applySort(
      items,
      sortBy ?? 'createdAt',
      sortDirection ?? 'desc',
    )
  }
}
