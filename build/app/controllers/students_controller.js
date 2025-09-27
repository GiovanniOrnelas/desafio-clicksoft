var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import StudentService from '#services/student_service';
import { inject } from '@adonisjs/core';
import { createStudentValidator, updateStudentValidator } from '#validators/student_validator';
import { DateTime } from 'luxon';
let StudentsController = class StudentsController {
    studentService;
    constructor(studentService) {
        this.studentService = studentService;
    }
    async store({ request, response }) {
        const payload = await request.validateUsing(createStudentValidator);
        const createStudentRequest = {
            ...payload,
            birthdate: DateTime.fromJSDate(payload.birthdate),
        };
        const student = await this.studentService.create(createStudentRequest);
        return response.created(student);
    }
    async show({ params, response }) {
        const id = params.id;
        return response.ok(await this.studentService.findById(id));
    }
    async update({ params, request, response }) {
        const id = params.id;
        const payload = await request.validateUsing(updateStudentValidator);
        const updateStudentRequest = {
            ...payload,
            birthdate: payload.birthdate ? DateTime.fromJSDate(payload.birthdate) : undefined,
        };
        return response.ok(await this.studentService.update(id, updateStudentRequest));
    }
    async destroy({ params, response }) {
        const id = params.id;
        await this.studentService.delete(id);
        return response.noContent();
    }
};
StudentsController = __decorate([
    inject(),
    __metadata("design:paramtypes", [StudentService])
], StudentsController);
export default StudentsController;
//# sourceMappingURL=students_controller.js.map