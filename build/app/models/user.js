var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { column, hasOne } from '@adonisjs/lucid/orm';
import AppBaseModel from './appBaseModel.js';
import Teacher from './teacher.js';
import Student from './student.js';
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens';
import { UserRole } from '../enumerator/user_role.js';
import Administrator from './administrator.js';
export default class User extends AppBaseModel {
    static accessTokens = DbAccessTokensProvider.forModel(User, {
        expiresIn: '30 days',
        prefix: 'oat_',
        table: 'auth_access_tokens',
        type: 'auth_token',
        tokenSecretLength: 40,
    });
    update(name, email, password) {
        this.name = name;
        this.email = email;
        if (password !== undefined)
            this.password = password;
    }
    desactivate() {
        this.active = false;
    }
}
__decorate([
    column(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    column({ serializeAs: null }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    hasOne(() => Teacher),
    __metadata("design:type", Object)
], User.prototype, "teacher", void 0);
__decorate([
    hasOne(() => Student),
    __metadata("design:type", Object)
], User.prototype, "student", void 0);
__decorate([
    hasOne(() => Administrator),
    __metadata("design:type", Object)
], User.prototype, "administrator", void 0);
//# sourceMappingURL=user.js.map