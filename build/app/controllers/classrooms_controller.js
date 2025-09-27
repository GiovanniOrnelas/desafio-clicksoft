var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import ClassroomService from '#services/classroom_service';
import { inject } from '@adonisjs/core';
import { createClassroomValidator, updateClassroomValidator } from '#validators/classroom_validator';
let ClassroomsController = class ClassroomsController {
    classroomServie;
    constructor(classroomServie) {
        this.classroomServie = classroomServie;
    }
    async store({ request, response }) {
        const payload = await request.validateUsing(createClassroomValidator);
        return response.created(await this.classroomServie.create(payload));
    }
    async show({ params, response }) {
        const classroomId = params.id;
        return response.ok(await this.classroomServie.findById(classroomId));
    }
    async update({ request, response, params }) {
        const classroomId = params.id;
        const payload = await request.validateUsing(updateClassroomValidator);
        return response.created(await this.classroomServie.update(classroomId, payload));
    }
    async destroy({ params, response }) {
        const classroomId = params.id;
        await this.classroomServie.delete(classroomId);
        return response.noContent();
    }
};
ClassroomsController = __decorate([
    inject(),
    __metadata("design:paramtypes", [ClassroomService])
], ClassroomsController);
export default ClassroomsController;
//# sourceMappingURL=classrooms_controller.js.map