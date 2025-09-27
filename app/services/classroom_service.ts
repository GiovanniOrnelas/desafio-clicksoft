import ValidationException from '#exceptions/validation_exception';
import Classroom from '#models/classroom'
import { CreateClassroomRequest } from '../dto/request/classroom/create_classroom_request.js';
import { GetClassroomResponse } from '../dto/response/classroom/get_classroom_response.js';
import { CreateClassroomResponse } from '../dto/response/classroom/create_classroom_response.js';
import { UpdateClassroomResponse } from '../dto/response/classroom/update_classroom_response.js';
import { UpdateClassroomRequest } from '../dto/request/classroom/update_classroom_request.js';
import { ClassroomStudentRepository } from '../repositories/classroom_student_repository.js';
import { ClassroomRepository } from '../repositories/classroom_repository.js';
import { UserRepository } from '../repositories/user_repository.js';
import { inject } from '@adonisjs/core';
import { InvalidArgumentsException } from '@adonisjs/core/exceptions';

@inject()
export default class ClassroomService {
  constructor(
    protected classroomStudentRepository: ClassroomStudentRepository,
    protected classroomRepository: ClassroomRepository,
    protected userRepository: UserRepository
  ) { }

  async create(createClassroomRequest: CreateClassroomRequest): Promise<CreateClassroomResponse> {
    if (await this.classroomRepository.getByNumberAsync(createClassroomRequest.number)) throw new InvalidArgumentsException('this classroom already exist')

    const classroom = await Classroom.create({
      number: createClassroomRequest.number,
      capacity: createClassroomRequest.capacity,
      teacherId: createClassroomRequest.teacherId
    })

    const user = await this.userRepository.getTeacherByIdAsync(createClassroomRequest.teacherId)

    const response: CreateClassroomResponse = {
      id: classroom.id,
      capacity: classroom.capacity,
      number: classroom.number,
      teacher: {
        id: user.id,
        email: user.email,
        name: user.name,
        registration: user.teacher.registration,
        birthdate: user.teacher.birthdate
      }
    }

    return response
  }

  async findById(classroomId: number): Promise<GetClassroomResponse> {
    const classroom = await this.classroomRepository.getByIdAsync(classroomId);

    if (classroom == undefined) throw new ValidationException('')

    const classroomStudentCount = await this.classroomStudentRepository.getQuantityStudentsByClassroomIdAsync(classroomId);

    const response: GetClassroomResponse = {
      id: classroom.id,
      avaibility: classroomStudentCount < classroom.capacity ? true : false,
      capacity: classroom.capacity,
      number: classroom.number,
      teacher: {
        id: classroom.user.id,
        email: classroom.user.email,
        name: classroom.user.name,
        registration: classroom.user.teacher.registration,
        birthdate: classroom.user.teacher.birthdate
      }
    }

    return response
  }

  async update(classroomId: number, updateClassroomRequest: UpdateClassroomRequest): Promise<UpdateClassroomResponse> {
    const classroom = await this.classroomRepository.getByIdAsync(classroomId);

    const classroomStudentCount = await this.classroomStudentRepository.getQuantityStudentsByClassroomIdAsync(classroomId);

    if (classroomStudentCount > updateClassroomRequest.capacity) throw new ValidationException('it is not possible to change the capacity because the number of students is greater')


    if(await this.classroomRepository.existOtherClassroomWithTheSameNumberAsync(classroomId, updateClassroomRequest.number)) throw new ValidationException('already exist other classroom with the same number')

    classroom.update(updateClassroomRequest.number, updateClassroomRequest.capacity)

    await classroom.save()

    var response: UpdateClassroomResponse = {
      id: classroom.id,
      avaibility: classroomStudentCount < classroom.capacity ? true : false,
      capacity: classroom.capacity,
      number: classroom.number,
      teacher: {
        id: classroom.user.id,
        email: classroom.user.email,
        name: classroom.user.name,
        registration: classroom.user.teacher.registration,
        birthdate: classroom.user.teacher.birthdate
      }
    }

    return response
  }

  async delete(classroomId: number): Promise<void> {
    const classroom = await Classroom.findOrFail(classroomId)

    if (classroom == undefined) throw new ValidationException('')

    classroom.desactivate()
    await classroom.save()
  }
}