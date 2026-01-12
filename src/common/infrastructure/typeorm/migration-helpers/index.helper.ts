import { TableIndex } from 'typeorm'

/**
 * Cria um índice para uma tabela do TypeORM
 * @param name - nome do índice (ex: IDX_USERS_EMAIL)
 * @param columns - colunas que fazem parte do índice
 * @param unique - define se é índice único (default: false)
 * @returns TableIndex configurado
 */
export const createIndex = ({
  name,
  columns,
  unique = false,
}: {
  name: string
  columns: string[]
  unique?: boolean
}): TableIndex => {
  if (!columns || columns.length === 0) {
    throw new Error(
      `Não é possível criar índice "${name}" sem colunas definidas`,
    )
  }

  return new TableIndex({
    name,
    columnNames: columns,
    isUnique: unique,
  })
}
