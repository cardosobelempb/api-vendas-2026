import { TableColumn, TableColumnOptions } from 'typeorm'

/**
 * Chaves que NUNCA podem ser sobrescritas
 */
type ForbiddenColumnKeys =
  | 'name'
  | 'type'
  | 'isPrimary'
  | 'isGenerated'
  | 'generationStrategy'
  | 'default'

/**
 * Remove propriedades proibidas dos overrides
 */
const sanitizeOverrides = (
  overrides: Partial<TableColumnOptions>,
  forbiddenKeys: ForbiddenColumnKeys[],
): Partial<TableColumnOptions> => {
  const sanitized = { ...overrides }

  for (const key of forbiddenKeys) {
    delete sanitized[key]
  }

  return sanitized
}

/**
 * Coluna UUID padrão
 */
export const uuidColumn = (
  name = 'id',
  overrides: Partial<TableColumnOptions> = {},
): TableColumn => {
  const isPrimaryKey = name === 'id'

  const safeOverrides = sanitizeOverrides(overrides, [
    'name',
    'type',
    'isPrimary',
    'isGenerated',
    'generationStrategy',
    'default',
  ])

  return new TableColumn({
    name,
    type: 'uuid',
    isNullable: false,

    ...(isPrimaryKey && {
      isPrimary: true,
      isGenerated: true,
      generationStrategy: 'uuid',
      default: 'gen_random_uuid()',
    }),

    ...safeOverrides,
  })
}

/**
 * Coluna VARCHAR padrão
 */
export const varcharColumn = (
  name: string,
  length = 100,
  overrides: Partial<TableColumnOptions> = {},
): TableColumn => {
  const safeOverrides = sanitizeOverrides(overrides, ['name', 'type'])

  return new TableColumn({
    name,
    type: 'varchar',
    length: length.toString(),
    isNullable: false,
    isUnique: false,
    ...safeOverrides,
  })
}

/**
 * Coluna DECIMAL para valores monetários
 */
export const priceColumn = (
  name: string,
  precision = 10,
  scale = 2,
  overrides: Partial<TableColumnOptions> = {},
): TableColumn => {
  const safeOverrides = sanitizeOverrides(overrides, ['name', 'type'])

  return new TableColumn({
    name,
    type: 'decimal',
    precision,
    scale,
    isNullable: false,
    isUnique: false,
    ...safeOverrides,
  })
}

/**
 * Coluna INT padrão
 */
export const intColumn = (
  name: string,
  overrides: Partial<TableColumnOptions> = {},
): TableColumn => {
  const safeOverrides = sanitizeOverrides(overrides, ['name', 'type'])

  return new TableColumn({
    name,
    type: 'int',
    isNullable: false,
    isUnique: false,
    ...safeOverrides,
  })
}
