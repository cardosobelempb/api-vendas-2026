import { IServiceError } from './service-error.interface'

export class UnsupportedMediaTypeError extends Error implements IServiceError {
  constructor(message: string) {
    super(message)
    this.name = 'UnsupportedMediaTypeError'
  }
}
