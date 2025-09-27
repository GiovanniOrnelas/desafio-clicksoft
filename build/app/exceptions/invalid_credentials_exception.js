import { Exception } from '@adonisjs/core/exceptions';
export default class InvalidCredentialsException extends Exception {
    static status = 401;
    static code = 'invalid credentials';
    constructor(message = 'Invalid credentials') {
        super(message, { status: InvalidCredentialsException.status, code: InvalidCredentialsException.code });
    }
}
//# sourceMappingURL=invalid_credentials_exception.js.map