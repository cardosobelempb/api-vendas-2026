import { Situation } from '@/situations/infrastructure/entities/situation.entity'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm'

@Entity({ name: 'users' })
export class User {
  // 🔑 Chave primária UUID (padronizada com Situation)
  @PrimaryGeneratedColumn('uuid')
  id!: string

  // 👤 Nome do usuário
  @Column({ type: 'varchar', length: 150, name: 'fist_name' })
  fistName!: string

  @Column({ type: 'varchar', length: 150, name: 'last_name' })
  lastName!: string

  // 📧 Email único
  @Column({ type: 'varchar', unique: true })
  email!: string

  // 🔗 Muitos usuários pertencem a uma situação
  // Este é o lado DONO da relação (FK fica aqui)
  @ManyToOne(() => Situation, situation => situation.users)
  @JoinColumn({ name: 'situation_id' })
  situation!: Situation

  // 🕒 Data de criação
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date

  // 🔄 Data de atualização
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
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
