import { IControllerError } from './controller-error.interface'

export class BadRequestError extends Error implements IControllerError {
  constructor(message: string) {
    super(message)
  }
}
