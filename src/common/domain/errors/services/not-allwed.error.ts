import { IServiceError } from './service-error.interface'

export class NotAllwedError extends Error implements IServiceError {
  constructor(message: string) {
    super(message)
    this.name = 'NotAllwedError'
  }
}
