import type { HttpContext } from '@adonisjs/core/http'
import StudentService from '#services/student_service'
import { inject } from '@adonisjs/core'
import { createStudentValidator, updateStudentValidator } from '#validators/student_validator'
import { DateTime } from 'luxon'
import { CreateStudentRequest } from '../dto/request/student/create_student_request.js'
import { UpdateStudentRequest } from '../dto/request/student/update_student_request.js'


@inject()
export default class StudentsController {
    constructor(protected studentService: StudentService) { }

    async store({ request, response }: HttpContext) {
        const payload = await request.validateUsing(createStudentValidator)

        const createStudentRequest: CreateStudentRequest = {
            ...payload,
            birthdate: DateTime.fromJSDate(payload.birthdate),
        }

        const student = await this.studentService.create(createStudentRequest)

        return response.created(student)
    }

    async show({ params, response }: HttpContext) {
        const id = params.id

        return response.ok(await this.studentService.findById(id))
    }

    async update({ params, request, response }: HttpContext) {
        const id = params.id
        const payload = await request.validateUsing(updateStudentValidator)

        const updateStudentRequest: UpdateStudentRequest = {
            ...payload,
            birthdate: payload.birthdate ? DateTime.fromJSDate(payload.birthdate) : undefined,
        }

        return response.ok(await this.studentService.update(id, updateStudentRequest))
    }

    async destroy({ params, response }: HttpContext) {
        const id = params.id
        await this.studentService.delete(id)

        return response.noContent()
    }
}