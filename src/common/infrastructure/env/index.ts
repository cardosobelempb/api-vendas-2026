import 'dotenv/config'
import { z } from 'zod'
import { EnvValidationError } from './EnvValidationError'

/**
 * Esquema de validação das variáveis de ambiente.
 * Executado durante o bootstrap da aplicação.
 */
export const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),

  PORT: z.coerce.number().default(3333),

  API_URL: z.string().url().default('http://localhost:3333'),

  DATABASE_URL: z.string().min(1, 'DATABASE_URL é obrigatória'),
})

const parsedEnv = envSchema.safeParse(process.env)

if (!parsedEnv.success) {
  const error = new EnvValidationError('env')

  /**
   * Mapeia os erros do Zod para o modelo de erro da aplicação.
   */
  parsedEnv.error.issues.forEach(issue => {
    error.addFieldError(issue.path.join('.') || 'env', issue.message)
  })

  throw error.toJSON()
}

export const env = parsedEnv.data
