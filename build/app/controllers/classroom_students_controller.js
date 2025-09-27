var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { inject } from '@adonisjs/core';
import ClassroomStudentService from '#services/classroom_student_service';
import { createClassroomStudentValidator, deleteClassroomStudentValidator } from '#validators/classroom_student_validator';
let ClassroomStudentsController = class ClassroomStudentsController {
    classroomStudentService;
    constructor(classroomStudentService) {
        this.classroomStudentService = classroomStudentService;
    }
    async store({ request, response }) {
        var payload = await request.validateUsing(createClassroomStudentValidator);
        return response.created(await this.classroomStudentService.createStudent(payload));
    }
    async destroy({ request, response }) {
        var payload = await request.validateUsing(deleteClassroomStudentValidator);
        await this.classroomStudentService.deleteStudent(payload);
        return response.noContent();
    }
    async indexByClassroom({ request, response }) {
        const classroomId = Number(request.input('classroomId'));
        const teacherId = Number(request.input('teacherId'));
        const students = await this.classroomStudentService.getStudentsByClassroom(classroomId, teacherId);
        return response.ok(students);
    }
    async indexByStudent({ request, response }) {
        const studentId = request.input('studentId');
        const result = await this.classroomStudentService.getClassroomsByStudent(studentId);
        return response.ok(result);
    }
};
ClassroomStudentsController = __decorate([
    inject(),
    __metadata("design:paramtypes", [ClassroomStudentService])
], ClassroomStudentsController);
export default ClassroomStudentsController;
//# sourceMappingURL=classroom_students_controller.js.map