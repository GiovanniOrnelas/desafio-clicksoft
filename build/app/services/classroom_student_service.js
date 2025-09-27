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
import ClassroomStudent from '#models/classroomStudent';
import { InvalidArgumentsException } from '@adonisjs/core/exceptions';
import { ClassroomStudentRepository } from '../repositories/classroom_student_repository.js';
import { ClassroomRepository } from '../repositories/classroom_repository.js';
import { inject } from '@adonisjs/core';
let ClassroomStudentService = class ClassroomStudentService {
    classroomStudent;
    classroomRepository;
    constructor(classroomStudent, classroomRepository) {
        this.classroomStudent = classroomStudent;
        this.classroomRepository = classroomRepository;
    }
    async createStudent(createClassroomStudentRequest) {
        const { classroomId, teacherId, studentId } = createClassroomStudentRequest;
        console.log(createClassroomStudentRequest);
        const classroom = await this.classroomRepository.getByTeacherIdAsync(classroomId, teacherId);
        const studentIsRegistrated = await this.classroomStudent.getByStudentIdAndClassroomIdAsync(classroomId, studentId);
        if (studentIsRegistrated)
            throw new InvalidArgumentsException('student is already registrated in the classroom');
        const classroomStudentCount = await this.classroomStudent.getQuantityStudentsByClassroomIdAsync(classroomId);
        if (classroomStudentCount == classroom.capacity)
            throw new ValidationException('');
        await ClassroomStudent.create({ classroomId, studentId });
    }
    async deleteStudent(deleteClassroomStudentRequest) {
        const { classroomId, studentId } = deleteClassroomStudentRequest;
        const classroomStudent = await this.classroomStudent.getByStudentIdAndClassroomIdAsync(classroomId, studentId);
        if (classroomStudent == undefined)
            throw new ValidationException('user not exist in the classroom');
        classroomStudent.desactivate();
        await classroomStudent.save();
    }
    async getStudentsByClassroom(classroomId, teacherId) {
        const classroom = await this.classroomRepository.getByIdAsync(classroomId);
        if (classroom.teacherId != teacherId)
            throw new ValidationException('you do not have permission to access students in this classroom.');
        const records = await this.classroomStudent.getStudentsByClassroomIdAsync(classroomId);
        const students = records.map((record) => ({
            id: record.student.userId,
            name: record.student.user.name,
            email: record.student.user.email,
            registration: record.student.registration,
        }));
        const response = {
            classroomId,
            classroomNumber: classroom.number,
            students
        };
        return response;
    }
    async getClassroomsByStudent(studentId) {
        const records = await this.classroomStudent.getClassroomsByStudentIdAsync(studentId);
        if (records.length === 0) {
            return {
                studentName: null,
                classrooms: []
            };
        }
        const classrooms = records.map((record) => {
            return {
                teacherName: record.classroom.user.name,
                classroomNumber: record.classroom.number,
            };
        });
        const response = {
            studentName: records[0].student.user.name,
            classrooms
        };
        return response;
    }
};
ClassroomStudentService = __decorate([
    inject(),
    __metadata("design:paramtypes", [ClassroomStudentRepository,
        ClassroomRepository])
], ClassroomStudentService);
export default ClassroomStudentService;
//# sourceMappingURL=classroom_student_service.js.map