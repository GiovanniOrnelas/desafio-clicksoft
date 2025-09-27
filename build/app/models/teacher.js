var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm';
import Classroom from './classroom.js';
import { DateTime } from 'luxon';
import User from './user.js';
export default class Teacher extends BaseModel {
    update(birthdate) {
        if (birthdate !== undefined)
            this.birthdate = birthdate;
    }
}
__decorate([
    column(),
    __metadata("design:type", String)
], Teacher.prototype, "registration", void 0);
__decorate([
    column.dateTime(),
    __metadata("design:type", DateTime)
], Teacher.prototype, "birthdate", void 0);
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], Teacher.prototype, "userId", void 0);
__decorate([
    hasMany(() => Classroom),
    __metadata("design:type", Object)
], Teacher.prototype, "classrooms", void 0);
__decorate([
    belongsTo(() => User, { foreignKey: 'userId' }),
    __metadata("design:type", Object)
], Teacher.prototype, "user", void 0);
//# sourceMappingURL=teacher.js.map