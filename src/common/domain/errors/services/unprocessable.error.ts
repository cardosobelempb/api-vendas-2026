import { IServiceError } from './service-error.interface'

export class UnprocessableEntityError extends Error implements IServiceError {
  constructor(message: string) {
    super(message)
    this.name = 'UnprocessableEntityError'
  }
}
