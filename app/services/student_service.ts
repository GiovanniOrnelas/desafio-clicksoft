import Student from '#models/student'
import User from '#models/user'
import { CreateStudentRequest } from '../dto/request/student/create_student_request.js'
import db from '@adonisjs/lucid/services/db'
import { CreateStudentResponse } from '../dto/response/student/create_student_response.js'
import { UserRole } from '../enumerator/user_role.js'
import { GetStudentResponse } from '../dto/response/student/get_student_response.js'
import { inject } from '@adonisjs/core'
import { InvalidArgumentsException } from '@adonisjs/core/exceptions'
import { UpdateStudentRequest } from '../dto/request/student/update_student_request.js'
import { UpdateStudentResponse } from '../dto/response/student/update_student_response.js'
import ValidationException from '#exceptions/validation_exception'
import { UserRepository } from '../repositories/user_repository.js'

@inject()
export default class StudentService {
  constructor(protected userRepository: UserRepository) { }

  async create(data: CreateStudentRequest): Promise<CreateStudentResponse> {
    const trx = await db.transaction()

    try {
      const existingUser = await User.findBy('email', data.email)
      if (existingUser) throw new InvalidArgumentsException('this user already exists')

      const existingRegistration = await Student.findBy('registration', data.registration)
      if (existingRegistration) throw new InvalidArgumentsException('this registration is already registered with another user')

      const user = await User.create({
        name: data.name,
        email: data.email,
        password: data.password,
        role: UserRole.STUDENT,
      }, { client: trx })

      const student = await Student.create({
        userId: user.id,
        registration: data.registration,
        birthdate: data.birthdate
      }, { client: trx })

      await trx.commit()

      const response: CreateStudentResponse = {
        id: user.id,
        name: user.name,
        email: user.email,
        registration: student.registration,
        birthdate: student.birthdate,
      }

      return response
    } catch (error) {
      await trx.rollback()
      throw error
    }
  }

  async findById(id: number): Promise<GetStudentResponse> {
    const user = await this.userRepository.getStudentByIdAsync(id);

    if (user == undefined) throw new InvalidArgumentsException('this user not exist')

    const response: GetStudentResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      registration: user.student.registration,
      birthdate: user.student.birthdate,
    }

    return response;
  }

  async update(id: number, request: UpdateStudentRequest): Promise<UpdateStudentResponse> {
    const trx = await db.transaction()

    try {
      const user = await this.userRepository.getStudentByIdAsync(id);

      user.student.update(request.birthdate)
      
      await user.student.useTransaction(trx).save();

      if(await this.userRepository.existsOtherUserWithEmailAsync(request.email, id)) throw new ValidationException('there is already another user with this email')
      
      user.update(request.name, request.email, request.password);
      await user.useTransaction(trx).save()

      await trx.commit()

      const response: UpdateStudentResponse = {
        id: user.id,
        name: user.name,
        email: user.email,
        registration: user.student.registration,
        birthdate: user.student.birthdate,
      }

      return response
    } catch (error) {
      await trx.rollback()
      throw error
    }
  }

  async delete(id: number): Promise<void> {
    const student = await Student.findOrFail(id)
    const user = await User.findOrFail(student.userId)

    user.active = false
    await user.save()
  }
}