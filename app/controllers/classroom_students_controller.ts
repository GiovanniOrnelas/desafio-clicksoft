import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import ClassroomStudentService from '#services/classroom_student_service'
import { createClassroomStudentValidator, deleteClassroomStudentValidator } from '#validators/classroom_student_validator'

@inject()
export default class ClassroomStudentsController {
  constructor(protected classroomStudentService: ClassroomStudentService) { }

  async store({ request, response }: HttpContext) {
    var payload = await request.validateUsing(createClassroomStudentValidator)

    return response.created(await this.classroomStudentService.createStudent(payload))
  }

  async destroy({ request, response }: HttpContext) {
    var payload = await request.validateUsing(deleteClassroomStudentValidator)

    await this.classroomStudentService.deleteStudent(payload)

    return response.noContent()
  }

  async indexByClassroom({ request, response }: HttpContext) {
    const classroomId = Number(request.input('classroomId'))
    const teacherId = Number(request.input('teacherId'))

    const students = await this.classroomStudentService.getStudentsByClassroom(classroomId, teacherId)
    return response.ok(students)
  }

  async indexByStudent({ request, response }: HttpContext) {
    const studentId = request.input('studentId')

    const result = await this.classroomStudentService.getClassroomsByStudent(studentId)
    return response.ok(result)
  }
}