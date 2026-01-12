import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

/**
 * Entidade de persistência (ORM)
 * NÃO deve conhecer regras de domínio
 */
@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ type: 'varchar', length: 150 })
  name!: string

  /**
   * ⚠️ decimal no Postgres retorna STRING
   * Manter como string na Entity
   */
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
