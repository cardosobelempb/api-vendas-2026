import { ProductModel } from '@/products/domain/models/products.model'
import { ProductEntity } from '../entities/product.entity'

export class ProductMapper {
  /**
   * Converte Entity (TypeORM) para Domain Model
   */
  static toDomain(entity: ProductEntity): ProductModel {
    return {
      id: entity.id,
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
  static toPersistence(domain: ProductModel): Partial<ProductEntity> {
    return {
      id: domain.id,
      name: domain.name,
      price: domain.price.toFixed(2), // string para Postgres decimal
      quantity: domain.quantity,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      deletedAt: domain.deletedAt ?? null,
    }
  }
}
