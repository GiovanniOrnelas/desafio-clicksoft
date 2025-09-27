var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { UserRole } from '../enumerator/user_role.js';
import Teacher from '#models/teacher';
import User from '#models/user';
import { InvalidArgumentsException } from '@adonisjs/core/exceptions';
import db from '@adonisjs/lucid/services/db';
import { UserRepository } from '../repositories/user_repository.js';
import { inject } from '@adonisjs/core';
let TeacherService = class TeacherService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async create(createTeacherRequest) {
        const trx = await db.transaction();
        try {
            const existingUser = await User.findBy('email', createTeacherRequest.email);
            if (existingUser)
                throw new InvalidArgumentsException('User already exists');
            const existingRegistration = await Teacher.findBy('registration', createTeacherRequest.registration);
            if (existingRegistration)
                throw new InvalidArgumentsException('this registration is already registered with another user');
            const user = await User.create({
                name: createTeacherRequest.name,
                email: createTeacherRequest.email,
                password: createTeacherRequest.password,
                role: UserRole.TEACHER,
            }, { client: trx });
            const teacher = await Teacher.create({
                userId: user.id,
                registration: createTeacherRequest.registration,
                birthdate: createTeacherRequest.birthdate,
            }, { client: trx });
            await trx.commit();
            const response = {
                id: user.id,
                name: user.name,
                email: user.email,
                registration: teacher.registration,
                birthdate: teacher.birthdate,
            };
            return response;
        }
        catch (error) {
            await trx.rollback();
            throw error;
        }
    }
    async findById(id) {
        const user = await this.userRepository.getTeacherByIdAsync(id);
        const response = {
            id: user.id,
            name: user.name,
            email: user.email,
            registration: user.teacher.registration,
            birthdate: user.teacher.birthdate,
        };
        return response;
    }
    async update(teacherId, updateTeacherRequest) {
        const trx = await db.transaction();
        try {
            const user = await this.userRepository.getTeacherByIdAsync(teacherId);
            user.teacher.update(updateTeacherRequest.birthdate);
            await user.teacher.useTransaction(trx).save();
            user.update(updateTeacherRequest.name, updateTeacherRequest.email, updateTeacherRequest.password);
            await user.useTransaction(trx).save();
            await trx.commit();
            const response = {
                id: user.id,
                name: user.name,
                email: user.email,
                registration: user.teacher.registration,
                birthdate: user.teacher.birthdate,
            };
            return response;
        }
        catch (error) {
            await trx.rollback();
            throw error;
        }
    }
    async delete(id) {
        const user = await this.userRepository.getTeacherByIdAsync(id);
        user.active = false;
        await user.save();
    }
};
TeacherService = __decorate([
    inject(),
    __metadata("design:paramtypes", [UserRepository])
], TeacherService);
export default TeacherService;
//# sourceMappingURL=teacher_service.js.map