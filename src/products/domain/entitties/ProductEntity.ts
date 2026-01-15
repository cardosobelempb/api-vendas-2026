// domain/entities/product.entity.ts
import { EntityDomain, UUIDVO } from '@/common'

import { ProductProps } from './product.props'

export class ProductEntity extends EntityDomain<ProductProps> {
  /* =======================
   * Getters
   * ======================= */

  get id(): UUIDVO {
    return this.props.id
  }

  get name(): string {
    return this.props.name
  }

  get price(): number {
    return this.props.price
  }

  get quantity(): number {
    return this.props.quantity
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get updatedAt(): Date {
    return this.props.updatedAt
  }

  get deletedAt(): Date | null {
    return this.props.deletedAt
  }

  /* =======================
   * Regras de negócio
   * ======================= */

  updatePrice(price: number): void {
    if (price < 0) {
      throw new Error('Preço não pode ser negativo')
    }

    this.props.price = price
    this.touch()
  }

  increaseStock(amount: number): void {
    if (amount <= 0) {
      throw new Error('Quantidade inválida')
    }

    this.props.quantity += amount
    this.touch()
  }

  softDelete(): void {
    if (this.props.deletedAt) {
      throw new Error('Produto já está deletado')
    }

    this.props.deletedAt = new Date()
    this.touch()
  }

  /* =======================
   * Métodos internos
   * ======================= */

  private touch(): void {
    this.props.updatedAt = new Date()
  }

  /* =======================
   * Fábricas
   * ======================= */

  static create(props: {
    name: string
    price: number
    quantity: number
  }): ProductEntity {
    if (props.price < 0) {
      throw new Error('Preço não pode ser negativo')
    }

    const now = new Date()

    return new ProductEntity({
      id: UUIDVO.create(),
      name: props.name,
      price: props.price,
      quantity: props.quantity,
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
    })
  }

  static restore(props: ProductProps): ProductEntity {
    return new ProductEntity(props)
  }
}
