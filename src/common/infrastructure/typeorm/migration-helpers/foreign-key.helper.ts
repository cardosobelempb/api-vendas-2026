import { TableForeignKey } from 'typeorm'

interface ForeignKeyParams {
  name: string
  column: string
  referencedTable: string
  referencedColumn?: string
  onDelete?: 'RESTRICT' | 'CASCADE' | 'SET NULL'
}

/**
 * Cria Foreign Keys padronizadas
 */
export const createForeignKey = ({
  name,
  column,
  referencedTable,
  referencedColumn = 'id',
  onDelete = 'RESTRICT',
}: ForeignKeyParams): TableForeignKey =>
  new TableForeignKey({
    name,
    columnNames: [column],
    referencedTableName: referencedTable,
    referencedColumnNames: [referencedColumn],
    onDelete,
  })
