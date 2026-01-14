// infra/typeorm/entities/product.orm-entity.ts
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('products')
export class ProductOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ length: 150 })
  name!: string

  // Decimal no banco → string
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price!: string

  @Column({ type: 'int' })
  quantity!: number

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt?: Date | null
}
