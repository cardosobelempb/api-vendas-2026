import { IServiceError } from './service-error.interface'

export class EntityNotFoundError extends Error implements IServiceError {
  constructor(message: string) {
    super(message)
    this.name = 'EntityNotFoundError'
  }
}
