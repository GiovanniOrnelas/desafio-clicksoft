import { Exception } from '@adonisjs/core/exceptions'

export default class ValidationException extends Exception {
  static status = 400
  static code = 'validation error'

  constructor(message = 'Validation error') {
    super(message, { status: ValidationException.status, code: ValidationException.code })
  }
}