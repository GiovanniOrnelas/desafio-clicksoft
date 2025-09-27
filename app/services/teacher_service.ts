import { UserRole } from '../enumerator/user_role.js';
import Teacher from '#models/teacher'
import User from '#models/user';
import { InvalidArgumentsException } from '@adonisjs/core/exceptions';
import db from '@adonisjs/lucid/services/db';
import { UserRepository } from '../repositories/user_repository.js';
import { UpdateTeacherRequest } from '../dto/request/teacher/update_teacher_request.js';
import { CreateTeacherRequest } from '../dto/request/teacher/create_teacher_request.js';
import { CreateTeacherResponse } from '../dto/response/teacher/create_teacher_response.js';
import { UpdateTeacherResponse } from '../dto/response/teacher/update_teacher_response.js';
import { GetTeacherResponse } from '../dto/response/teacher/get_teacher_response.js';
import { inject } from '@adonisjs/core';

@inject()
export default class TeacherService {
  constructor(protected userRepository: UserRepository) { }

  async create(createTeacherRequest: CreateTeacherRequest): Promise<CreateTeacherResponse> {
    const trx = await db.transaction()

    try {
      const existingUser = await User.findBy('email', createTeacherRequest.email)
      if (existingUser) throw new InvalidArgumentsException('User already exists')

      const existingRegistration = await Teacher.findBy('registration', createTeacherRequest.registration)
      if (existingRegistration) throw new InvalidArgumentsException('this registration is already registered with another user')

      const user = await User.create({
        name: createTeacherRequest.name,
        email: createTeacherRequest.email,
        password: createTeacherRequest.password,
        role: UserRole.TEACHER,
      }, { client: trx })

      const teacher = await Teacher.create({
        userId: user.id,
        registration: createTeacherRequest.registration,
        birthdate: createTeacherRequest.birthdate,
      }, { client: trx })

      await trx.commit()

      const response: CreateTeacherResponse = {
        id: user.id,
        name: user.name,
        email: user.email,
        registration: teacher.registration,
        birthdate: teacher.birthdate,
      }

      return response
    } catch (error) {
      await trx.rollback()
      throw error
    }
  }

  async findById(id: number): Promise<GetTeacherResponse> {
    const user = await this.userRepository.getTeacherByIdAsync(id);

    const response: GetTeacherResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      registration: user.teacher.registration,
      birthdate: user.teacher.birthdate,
    }

    return response
  }

  async update(teacherId: number, updateTeacherRequest: UpdateTeacherRequest): Promise<UpdateTeacherResponse> {
    const trx = await db.transaction()

    try {
      const user = await this.userRepository.getTeacherByIdAsync(teacherId)

      user.teacher.update(updateTeacherRequest.birthdate)
      await user.teacher.useTransaction(trx).save()

      user.update(updateTeacherRequest.name, updateTeacherRequest.email, updateTeacherRequest.password)
      await user.useTransaction(trx).save()

      await trx.commit()

      const response: UpdateTeacherResponse = {
        id: user.id,
        name: user.name,
        email: user.email,
        registration: user.teacher.registration,
        birthdate: user.teacher.birthdate,
      }

      return response
    } catch (error) {
      await trx.rollback()
      throw error
    }
  }

  async delete(id: number): Promise<void> {
    const user = await this.userRepository.getTeacherByIdAsync(id)

    user.active = false
    await user.save()
  }
}