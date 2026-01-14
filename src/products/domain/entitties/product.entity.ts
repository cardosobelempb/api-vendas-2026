// domain/entities/product.entity.ts
import { DomainEntity, UUIDVO } from '@/common'

import { ProductModel } from '../models/product.model'

export class ProductEntity extends DomainEntity<ProductModel> {
  get name() {
    return this.props.name
  }

  get price() {
    return this.props.price
  }

  get quantity() {
    return this.props.quantity
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get deletedAt() {
    return this.props.deletedAt
  }

  updatePrice(price: number) {
    this.props.price = price
    this.touch()
  }

  softDelete() {
    this.props.deletedAt = new Date()
    this.touch()
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Omit<ProductModel, 'createdAt' | 'updatedAt' | 'deletedAt'>,
    id?: UUIDVO,
  ) {
    const now = new Date()

    return new ProductEntity(
      {
        ...props,
        createdAt: now,
        updatedAt: now,
        deletedAt: null,
      },
      id,
    )
  }
}
