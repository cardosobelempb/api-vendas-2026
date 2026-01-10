import { IServiceError } from './service-error.interface'

export class ForbiddenError extends Error implements IServiceError {
  constructor(message: string) {
    super(message)
    this.name = 'ForbiddenError'
  }
}
