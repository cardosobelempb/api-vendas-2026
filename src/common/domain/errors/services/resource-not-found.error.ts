import { IServiceError } from './service-error.interface'

export class ResourceNotFoundError extends Error implements IServiceError {
  constructor(message: string) {
    super(message)
    this.name = 'ResourceNotFoundError'
  }
}
