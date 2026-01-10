import { IServiceError } from './service-error.interface'

export class DuplicateError extends Error implements IServiceError {
  constructor(message: string) {
    super(message)
    this.name = 'DuplicateError'
  }
}
