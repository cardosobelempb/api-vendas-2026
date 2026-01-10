import { IServiceError } from './service-error.interface'

export class UnauthorizedError extends Error implements IServiceError {
  constructor(message: string) {
    super(message)
    this.name = 'UnauthorizedError'
  }
}
