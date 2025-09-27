var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import ValidationException from '#exceptions/validation_exception';
import Classroom from '#models/classroom';
import { ClassroomStudentRepository } from '../repositories/classroom_student_repository.js';
import { ClassroomRepository } from '../repositories/classroom_repository.js';
import { UserRepository } from '../repositories/user_repository.js';
import { inject } from '@adonisjs/core';
import { InvalidArgumentsException } from '@adonisjs/core/exceptions';
let ClassroomService = class ClassroomService {
    classroomStudentRepository;
    classroomRepository;
    userRepository;
    constructor(classroomStudentRepository, classroomRepository, userRepository) {
        this.classroomStudentRepository = classroomStudentRepository;
        this.classroomRepository = classroomRepository;
        this.userRepository = userRepository;
    }
    async create(createClassroomRequest) {
        if (await this.classroomRepository.getByNumberAsync(createClassroomRequest.number))
            throw new InvalidArgumentsException('this classroom already exist');
        const classroom = await Classroom.create({
            number: createClassroomRequest.number,
            capacity: createClassroomRequest.capacity,
            teacherId: createClassroomRequest.teacherId
        });
        const user = await this.userRepository.getTeacherByIdAsync(createClassroomRequest.teacherId);
        const response = {
            id: classroom.id,
            capacity: classroom.capacity,
            number: classroom.number,
            teacher: {
                id: user.id,
                email: user.email,
                name: user.name,
                registration: user.teacher.registration,
                birthdate: user.teacher.birthdate
            }
        };
        return response;
    }
    async findById(classroomId) {
        const classroom = await this.classroomRepository.getByIdAsync(classroomId);
        if (classroom == undefined)
            throw new ValidationException('');
        const classroomStudentCount = await this.classroomStudentRepository.getQuantityStudentsByClassroomIdAsync(classroomId);
        const response = {
            id: classroom.id,
            avaibility: classroomStudentCount < classroom.capacity ? true : false,
            capacity: classroom.capacity,
            number: classroom.number,
            teacher: {
                id: classroom.user.id,
                email: classroom.user.email,
                name: classroom.user.name,
                registration: classroom.user.teacher.registration,
                birthdate: classroom.user.teacher.birthdate
            }
        };
        return response;
    }
    async update(classroomId, updateClassroomRequest) {
        const classroom = await this.classroomRepository.getByIdAsync(classroomId);
        const classroomStudentCount = await this.classroomStudentRepository.getQuantityStudentsByClassroomIdAsync(classroomId);
        if (classroomStudentCount > updateClassroomRequest.capacity)
            throw new ValidationException('it is not possible to change the capacity because the number of students is greater');
        if (await this.classroomRepository.existOtherClassroomWithTheSameNumberAsync(classroomId, updateClassroomRequest.number))
            throw new ValidationException('already exist other classroom with the same number');
        classroom.update(updateClassroomRequest.number, updateClassroomRequest.capacity);
        await classroom.save();
        var response = {
            id: classroom.id,
            avaibility: classroomStudentCount < classroom.capacity ? true : false,
            capacity: classroom.capacity,
            number: classroom.number,
            teacher: {
                id: classroom.user.id,
                email: classroom.user.email,
                name: classroom.user.name,
                registration: classroom.user.teacher.registration,
                birthdate: classroom.user.teacher.birthdate
            }
        };
        return response;
    }
    async delete(classroomId) {
        const classroom = await Classroom.findOrFail(classroomId);
        if (classroom == undefined)
            throw new ValidationException('');
        classroom.desactivate();
        await classroom.save();
    }
};
ClassroomService = __decorate([
    inject(),
    __metadata("design:paramtypes", [ClassroomStudentRepository,
        ClassroomRepository,
        UserRepository])
], ClassroomService);
export default ClassroomService;
//# sourceMappingURL=classroom_service.js.map