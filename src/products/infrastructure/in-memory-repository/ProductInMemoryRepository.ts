import {
  ConflictError,
  ErrorCode,
  InMemoryRepository,
  NotFoundError,
  UUIDVO,
} from '@/common'
import { ProductModel } from '@/products/domain/models/product.model'
import { ProductRepository } from '@/products/domain/repositories/ProductRespository'

export class ProductInMemoryRepository
  extends InMemoryRepository<ProductModel>
  implements ProductRepository
{
  protected sortableFields: (keyof ProductModel)[] = ['name', 'createdAt']

  async findByName(name: string): Promise<ProductModel> {
    const product = this.items.find(item => item.name === name)
    if (!product) {
      throw new NotFoundError(`${ErrorCode.NOT_FOUND} name ${name}`)
    }
    return product
  }
  /**
   * Busca produtos em memória a partir de uma lista de IDs.
   *
   * @param productIds Lista de UUIDs válidos
   * @returns Lista de produtos encontrados (pode ser vazia)
   */
  async findAllByIds(productIds: UUIDVO[]): Promise<ProductModel[]> {
    // Caso não haja IDs, retorna lista vazia imediatamente (fail fast)
    if (productIds.length === 0) {
      return []
    }

    // Converte os IDs para Set para busca O(1)
    const ids = new Set(productIds)

    // Filtra apenas os produtos cujo ID exista no conjunto
    return this.items.filter(item => ids.has(item.id))
  }

  async ensureNameIsUnique(name: string): Promise<void> {
    const product = this.items.find(item => item.name === name)
    if (product) {
      throw new ConflictError(ErrorCode.CONFLICT_ERROR)
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
