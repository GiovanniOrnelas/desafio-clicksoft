import type { HttpContext } from '@adonisjs/core/http'
import { UserRepository } from '../repositories/user_repository.js'
import { inject } from '@adonisjs/core'
import User from '#models/user'
import ValidationException from '#exceptions/validation_exception'

@inject()
export default class AuthController {
    constructor(protected userRepository: UserRepository) { }

    async login({ request }: HttpContext) {
        const email = request.input('email')
        const password = request.input('password')

        const user = await this.userRepository.verifyCredentialsAsync(email, password)

        if(!user.active) throw new ValidationException('user not exist')
        return await User.accessTokens.create(user)
    }
}