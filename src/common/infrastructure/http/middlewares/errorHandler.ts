import { ValidationError } from '@/common/domain'
import { NextFunction, Request, Response } from 'express'

export function erroHandler(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
): Response {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json({
      statusCode: err.statusCode,
      message: err.message,
      error: err.error,
      name: err.name,
      timestamp: new Date(),
      path: err.path,
    })
  }

  console.log(err)

  return res
    .status(500)
    .json({ status: 'error', message: 'Internal Server Error' })
}
