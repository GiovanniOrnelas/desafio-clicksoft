var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import TeacherService from '#services/teacher_service';
import { inject } from '@adonisjs/core';
import { createTeacherValidator, updateTeacherValidator } from '#validators/teacher_validator';
import { DateTime } from 'luxon';
let TeachersController = class TeachersController {
    teacherService;
    constructor(teacherService) {
        this.teacherService = teacherService;
    }
    async store({ request, response }) {
        const payload = await request.validateUsing(createTeacherValidator);
        const createStudentRequest = {
            ...payload,
            birthdate: DateTime.fromJSDate(payload.birthdate),
        };
        return response.created(await this.teacherService.create(createStudentRequest));
    }
    async show({ params, response }) {
        const id = params.id;
        return response.ok(await this.teacherService.findById(id));
    }
    async update({ params, request, response }) {
        const teacherId = params.id;
        const payload = await request.validateUsing(updateTeacherValidator);
        const updateStudentRequest = {
            ...payload,
            birthdate: payload.birthdate ? DateTime.fromJSDate(payload.birthdate) : undefined,
        };
        return response.created(await this.teacherService.update(teacherId, updateStudentRequest));
    }
    async destroy({ params, response }) {
        const id = params.id;
        await this.teacherService.delete(id);
        return response.noContent();
    }
};
TeachersController = __decorate([
    inject(),
    __metadata("design:paramtypes", [TeacherService])
], TeachersController);
export default TeachersController;
//# sourceMappingURL=teachers_controller.js.map