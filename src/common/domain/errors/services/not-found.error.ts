import { ValidationError } from '../validation-error.error'
import { IServiceError } from './service-error.interface'

export class NotFoundError extends ValidationError implements IServiceError {
  constructor(message: string) {
    super(message, 404)
    this.name = 'NotFoundError'
  }
}
