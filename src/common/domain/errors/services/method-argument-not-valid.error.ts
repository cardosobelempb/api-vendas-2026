import { IServiceError } from './service-error.interface'

export class MethodArgumentNotValidError
  extends Error
  implements IServiceError
{
  constructor(message: string) {
    super(message)
    this.name = 'MethodArgumentNotValidError'
  }
}
