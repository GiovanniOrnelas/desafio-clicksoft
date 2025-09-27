import type { HttpContext } from '@adonisjs/core/http'
import ClassroomService from '#services/classroom_service'
import { inject } from '@adonisjs/core'
import { createClassroomValidator, updateClassroomValidator } from '#validators/classroom_validator'
import { CreateClassroomRequest } from '../dto/request/classroom/create_classroom_request.js'
import { UpdateClassroomRequest } from '../dto/request/classroom/update_classroom_request.js'

@inject()
export default class ClassroomsController {
  constructor(protected classroomServie: ClassroomService) { }

  async store({ request, response }: HttpContext) {
    const payload: CreateClassroomRequest = await request.validateUsing(createClassroomValidator)

    return response.created(await this.classroomServie.create(payload))
  }

  async show({ params, response }: HttpContext) {
    const classroomId = params.id

    return response.ok(await this.classroomServie.findById(classroomId))
  }

  async update({ request, response, params }: HttpContext) {
    const classroomId = params.id;
    const payload: UpdateClassroomRequest = await request.validateUsing(updateClassroomValidator)

    return response.created(await this.classroomServie.update(classroomId, payload))
  }

  async destroy({ params, response }: HttpContext) {
    const classroomId = params.id
    await this.classroomServie.delete(classroomId)

    return response.noContent()
  }
}