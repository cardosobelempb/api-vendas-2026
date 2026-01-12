import 'reflect-metadata' // Sempre primeiro
import { DataSource, DataSourceOptions } from 'typeorm'
import { env } from '../env'

/** =============================
 * Banco de dados suportado
 * ============================= */
const SUPPORTED_DATABASES = ['postgres'] as const
type SupportedDatabase = (typeof SUPPORTED_DATABASES)[number]

function resolveDatabaseDialect(value: string | undefined): SupportedDatabase {
  return SUPPORTED_DATABASES.includes(value as SupportedDatabase)
    ? (value as SupportedDatabase)
    : 'postgres'
}

/** =============================
 * Validação de variáveis de ambiente
 * ============================= */
const requiredEnvVars = [
  'DB_HOST',
  'DB_PORT',
  'DB_USER',
  'DB_PASSWORD',
  'DB_NAME',
] as const

for (const key of requiredEnvVars) {
  if (!env[key]) {
    throw new Error(
      `[DataSource] Variável de ambiente obrigatória ausente: ${key}`,
    )
  }
}

/** =============================
 * Configuração de ambiente
 * ============================= */
const isProduction = env.NODE_ENV === 'production'
const databaseType = resolveDatabaseDialect(env.DB_TYPE)

/** Paths para entidades e migrations */
const ENTITIES = isProduction
  ? ['dist/**/entities/**/*.js']
  : ['src/**/entities/**/*.ts']

const MIGRATIONS = isProduction
  ? ['dist/**/migrations/**/*.js']
  : ['src/**/migrations/**/*.ts']

/** =============================
 * Configuração do DataSource
 * ============================= */
const dataSourceConfig: DataSourceOptions = {
  type: databaseType,
  host: env.DB_HOST,
  port: Number(env.DB_PORT),
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  schema: env.DB_SCHEMA,
  entities: ENTITIES,
  migrations: MIGRATIONS,
  synchronize: false, // Nunca em produção
  logging: env.NODE_ENV === 'development',
}

export const dataSource = new DataSource(dataSourceConfig)
