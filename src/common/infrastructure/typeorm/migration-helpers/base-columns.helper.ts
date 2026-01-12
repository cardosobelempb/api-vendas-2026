import { TableColumn } from 'typeorm'

/**
 * created_at padrão
 */
export const createdAtColumn = (): TableColumn =>
  new TableColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: 'now()',
    isNullable: false,
  })

/**
 * updated_at padrão
 */
export const updatedAtColumn = (): TableColumn =>
  new TableColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: 'now()',
    onUpdate: 'now()',
    isNullable: false,
  })

/**
 * deleted_at para soft delete
 */
export const deletedAtColumn = (): TableColumn =>
  new TableColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    isNullable: true,
  })

/**
 * Conjunto padrão de colunas base
 */
export const baseColumns = (): TableColumn[] => [
  createdAtColumn(),
  updatedAtColumn(),
  deletedAtColumn(),
]
