var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import Student from '#models/student';
import User from '#models/user';
import db from '@adonisjs/lucid/services/db';
import { UserRole } from '../enumerator/user_role.js';
import { inject } from '@adonisjs/core';
import { InvalidArgumentsException } from '@adonisjs/core/exceptions';
import ValidationException from '#exceptions/validation_exception';
import { UserRepository } from '../repositories/user_repository.js';
let StudentService = class StudentService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async create(data) {
        const trx = await db.transaction();
        try {
            const existingUser = await User.findBy('email', data.email);
            if (existingUser)
                throw new InvalidArgumentsException('this user already exists');
            const existingRegistration = await Student.findBy('registration', data.registration);
            if (existingRegistration)
                throw new InvalidArgumentsException('this registration is already registered with another user');
            const user = await User.create({
                name: data.name,
                email: data.email,
                password: data.password,
                role: UserRole.STUDENT,
            }, { client: trx });
            const student = await Student.create({
                userId: user.id,
                registration: data.registration,
                birthdate: data.birthdate
            }, { client: trx });
            await trx.commit();
            const response = {
                id: user.id,
                name: user.name,
                email: user.email,
                registration: student.registration,
                birthdate: student.birthdate,
            };
            return response;
        }
        catch (error) {
            await trx.rollback();
            throw error;
        }
    }
    async findById(id) {
        const user = await this.userRepository.getStudentByIdAsync(id);
        if (user == undefined)
            throw new InvalidArgumentsException('this user already exists');
        const response = {
            id: user.id,
            name: user.name,
            email: user.email,
            registration: user.student.registration,
            birthdate: user.student.birthdate,
        };
        return response;
    }
    async update(id, request) {
        const trx = await db.transaction();
        try {
            const user = await this.userRepository.getStudentByIdAsync(id);
            user.student.update(request.birthdate);
            await user.student.useTransaction(trx).save();
            if (await this.userRepository.existsOtherUserWithEmailAsync(request.email, id))
                throw new ValidationException('there is already another user with this email');
            user.update(request.name, request.email, request.password);
            await user.useTransaction(trx).save();
            await trx.commit();
            const response = {
                id: user.id,
                name: user.name,
                email: user.email,
                registration: user.student.registration,
                birthdate: user.student.birthdate,
            };
            return response;
        }
        catch (error) {
            await trx.rollback();
            throw error;
        }
    }
    async delete(id) {
        const student = await Student.findOrFail(id);
        const user = await User.findOrFail(student.userId);
        user.active = false;
        await user.save();
    }
};
StudentService = __decorate([
    inject(),
    __metadata("design:paramtypes", [UserRepository])
], StudentService);
export default StudentService;
//# sourceMappingURL=student_service.js.map