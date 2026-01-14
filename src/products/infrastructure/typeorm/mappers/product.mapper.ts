import { UUIDVO } from '@/common/domain'
import { ProductModel } from '@/products/domain/models/product.model'

import { ProductOrmEntity } from '../entities/product.orm-entity'

export class ProductMapper {
  /**
   * Converte Entity (TypeORM) para Domain Model
   */
  static toDomain(entity: ProductOrmEntity): ProductModel {
    return {
      id: UUIDVO.create(entity.id),
      name: entity.name,
      price: Number(entity.price), // converte decimal string para number
      quantity: entity.quantity,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt ?? null,
    }
  }

  /**
   * Converte Domain Model para Entity parcial (persistência)
   */
  static toPersistence(domain: ProductModel): Partial<ProductOrmEntity> {
    return {
      id: domain.id?.getValue() ?? '',
      name: domain.name,
      price: domain.price.toFixed(2), // string para Postgres decimal
      quantity: domain.quantity,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      deletedAt: domain.deletedAt ?? null,
    }
  }
}
