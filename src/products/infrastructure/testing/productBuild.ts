import { UUIDVO } from '@/common'
import { ProductEntity } from '@/products/domain/entitties/product.entity'
import { ProductModel } from '@/products/domain/models/product.model'

import { faker } from '@faker-js/faker'

/**
 * Factory para criação de ProductEntity em testes
 * - Garante entidade válida
 * - Permite override parcial de props
 * - Respeita invariantes do domínio
 */
export function productBuild(
  override: Partial<ProductModel> = {},
): ProductEntity {
  // Seed para previsibilidade (documentado)
  faker.seed(1)

  return ProductEntity.create(
    {
      id: override.id ?? UUIDVO.create(),
      name: override.name ?? faker.commerce.productName(),
      price:
        override.price ??
        Number(faker.commerce.price({ min: 100, max: 2000, dec: 2 })),
      quantity: override.quantity ?? 10,
    },
    override.id,
  )
}
