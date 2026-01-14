import { SearchableRepository, UUIDVO } from '@/common'

import { ProductModel } from '../models/product.model'

/**
 * Contrato de persistência do agregado Produto
 *
 * Regras:
 * - UUIDVO nunca é opcional
 * - Repositório não aceita dados inválidos
 */
export abstract class ProductRepository extends SearchableRepository<ProductModel> {
  /**
   * Busca um produto pelo nome.
   * Retorna null caso não exista.
   */
  abstract findByName(name: string): Promise<ProductModel | null>

  /**
   * Busca vários produtos a partir de seus IDs.
   *
   * @param productIds Lista de UUIDs válidos
   */
  abstract findAllByIds(productIds: UUIDVO[]): Promise<ProductModel[]>

  /**
   * Verifica se já existe um produto com o mesmo nome.
   * Lança erro em caso de conflito.
   */
  abstract ensureNameIsUnique(name: string): Promise<void>
}
