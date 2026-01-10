import { IServiceError } from './service-error.interface'

export class IllegalArgumentError extends Error implements IServiceError {
  constructor(message: string) {
    super(message)
    this.name = 'IllegalArgumentError'
  }
}
