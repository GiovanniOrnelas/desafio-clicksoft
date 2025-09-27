import type { HttpContext } from '@adonisjs/core/http'
import TeacherService from '#services/teacher_service'
import { inject } from '@adonisjs/core'
import { createTeacherValidator, updateTeacherValidator } from '#validators/teacher_validator'
import { DateTime } from 'luxon'
import { CreateTeacherRequest } from '../dto/request/teacher/create_teacher_request.js'
import { UpdateTeacherRequest } from '../dto/request/teacher/update_teacher_request.js'

@inject()
export default class TeachersController {
  constructor(protected teacherService: TeacherService) { }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createTeacherValidator)

    const createStudentRequest: CreateTeacherRequest = {
      ...payload,
      birthdate: DateTime.fromJSDate(payload.birthdate),
    }

    return response.created(await this.teacherService.create(createStudentRequest))
  }

  async show({ params, response }: HttpContext) {
    const id = params.id

    return response.ok(await this.teacherService.findById(id))
  }

  async update({ params, request, response }: HttpContext) {
    const teacherId = params.id
    const payload = await request.validateUsing(updateTeacherValidator)

    const updateStudentRequest: UpdateTeacherRequest = {
      ...payload,
      birthdate: payload.birthdate ? DateTime.fromJSDate(payload.birthdate) : undefined,
    }

    return response.created(await this.teacherService.update(teacherId, updateStudentRequest))
  }

  async destroy({ params, response }: HttpContext) {
    const id = params.id
    await this.teacherService.delete(id)

    return response.noContent()
  }
}