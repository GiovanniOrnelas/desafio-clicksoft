var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { UserRepository } from '../repositories/user_repository.js';
import { inject } from '@adonisjs/core';
import User from '#models/user';
import ValidationException from '#exceptions/validation_exception';
let AuthController = class AuthController {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async login({ request }) {
        const email = request.input('email');
        const password = request.input('password');
        const user = await this.userRepository.verifyCredentialsAsync(email, password);
        if (!user.active)
            throw new ValidationException('user not exist');
        return await User.accessTokens.create(user);
    }
};
AuthController = __decorate([
    inject(),
    __metadata("design:paramtypes", [UserRepository])
], AuthController);
export default AuthController;
//# sourceMappingURL=auth_controller.js.map