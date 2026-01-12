import { User } from '@/users/infrastructure/entities/user.entity'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { OneToMany } from 'typeorm'

@Entity({ name: 'situations' })
export class Situation {
  // 🔑 Chave primária usando UUID (mais seguro e escalável)
  @PrimaryGeneratedColumn('uuid')
  id!: string

  // 📌 Nome da situação (ex: Ativo, Inativo, Bloqueado)
  @Column({ name: 'name', type: 'varchar', length: 100 })
  name!: string

  // 🔗 Uma situação pode estar associada a vários usuários
  @OneToMany(() => User, user => user.situation)
  users!: User[]

  // 🕒 Data de criação (automática)
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date

  // 🔄 Data de atualização (automática)
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt!: Date

  // 🗑 Soft delete
  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  deletedAt?: Date
}
