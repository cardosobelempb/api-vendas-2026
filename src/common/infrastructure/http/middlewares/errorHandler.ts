import { NextFunction, Request, Response } from 'express'
import { ValidationError } from '@/common/domain'

/**
 * Estrutura padrão de erro HTTP
 * Facilita consistência e observabilidade
 */
interface ErrorResponse {
  statusCode: number
  message: string
  error?: string
  path?: string
  timestamp: string
}

/**
 * Middleware global de tratamento de erros
 * Deve ser registrado como ÚLTIMO middleware do Express
 */
export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
): Response {
  /**
   * Erros de domínio (esperados)
   */
  if (err instanceof ValidationError) {
    const response: ErrorResponse = {
      statusCode: err.statusCode,
      message: err.message,
      error: err.error,
      path: err.path,
      timestamp: new Date().toISOString(),
    }

    return res.status(err.statusCode).json(response)
  }

  /**
   * Log estruturado para erros inesperados
   * Em produção, substituir por logger (pino/winston)
   */
  console.error('[Unhandled Error]', {
    message: err instanceof Error ? err.message : String(err),
    stack: err instanceof Error ? err.stack : undefined,
    path: req.path,
    method: req.method,
  })

  /**
   * Erro genérico para o cliente
   * (não vazar detalhes internos)
   */
  const response: ErrorResponse = {
    statusCode: 500,
    message: 'Internal Server Error',
    timestamp: new Date().toISOString(),
  }

  return res.status(500).json(response)
}
