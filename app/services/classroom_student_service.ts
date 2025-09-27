import ValidationException from '#exceptions/validation_exception';
import ClassroomStudent from '#models/classroomStudent';
import { InvalidArgumentsException } from '@adonisjs/core/exceptions';
import { ClassroomStudentRepository } from '../repositories/classroom_student_repository.js';
import { ClassroomRepository } from '../repositories/classroom_repository.js';
import { DeleteClassroomStudentRequest } from '../dto/request/classroomStudent/delete_classroom_student_request.js';
import { CreateClassroomStudentRequest } from '../dto/request/classroomStudent/create_classroom_student_request.js';
import { inject } from '@adonisjs/core';
import { GetClassroomStudentResponse } from '../dto/response/classroomStudent/get_classroom_student_response.js';
import { GetStudentsClassroomResponse } from '../dto/response/classroomStudent/get_students_classroom_response.js';

@inject()
export default class ClassroomStudentService {
  constructor(
    protected classroomStudent: ClassroomStudentRepository,
    protected classroomRepository: ClassroomRepository
  ) { }

  async createStudent(createClassroomStudentRequest: CreateClassroomStudentRequest): Promise<void> {
    const { classroomId, teacherId, studentId } = createClassroomStudentRequest

    console.log(createClassroomStudentRequest)

    const classroom = await this.classroomRepository.getByTeacherIdAsync(classroomId, teacherId);

    const studentIsRegistrated = await this.classroomStudent.getByStudentIdAndClassroomIdAsync(classroomId, studentId);

    if (studentIsRegistrated) throw new InvalidArgumentsException('student is already registrated in the classroom')

    const classroomStudentCount = await this.classroomStudent.getQuantityStudentsByClassroomIdAsync(classroomId);

    if (classroomStudentCount == classroom.capacity) throw new ValidationException('')

    await ClassroomStudent.create({ classroomId, studentId })
  }

  async deleteStudent(deleteClassroomStudentRequest: DeleteClassroomStudentRequest): Promise<void> {
    const { classroomId, studentId } = deleteClassroomStudentRequest

    const classroomStudent = await this.classroomStudent.getByStudentIdAndClassroomIdAsync(classroomId, studentId);

    if (classroomStudent == undefined) throw new ValidationException('user not exist in the classroom')

    classroomStudent.desactivate()
    await classroomStudent.save()
  }

  async getStudentsByClassroom(classroomId: number, teacherId: number): Promise<GetStudentsClassroomResponse> {
    const classroom = await this.classroomRepository.getByIdAsync(classroomId)

    if (classroom.teacherId != teacherId) throw new ValidationException('you do not have permission to access students in this classroom.')

    const records = await this.classroomStudent.getStudentsByClassroomIdAsync(classroomId)

    const students = records.map((record) => ({
      id: record.student.userId,
      name: record.student.user.name,
      email: record.student.user.email,
      registration: record.student.registration,
    }))

    const response: GetStudentsClassroomResponse = {
      classroomId,
      classroomNumber: classroom.number,
      students
    }

    return response
  }

  async getClassroomsByStudent(studentId: number): Promise<GetClassroomStudentResponse> {
    const records = await this.classroomStudent.getClassroomsByStudentIdAsync(studentId)

    if (records.length === 0) {
      return {
        studentName: null,
        classrooms: []
      }
    }

    const classrooms = records.map((record) => {
      return {
        teacherName: record.classroom.user.name,
        classroomNumber: record.classroom.number,
      }
    })

    const response: GetClassroomStudentResponse = {
      studentName: records[0].student.user.name,
      classrooms
    }

    return response
  }
}