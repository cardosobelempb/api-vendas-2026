import { IServiceError } from './service-error.interface'

export class NotFoundError extends Error implements IServiceError {
  constructor(message: string) {
    super(message)
    this.name = 'NotFoundError'
  }
}
