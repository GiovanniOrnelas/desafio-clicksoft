import { UserRole } from '../enumerator/user_role.js'
import User from '#models/user'
import { IUserRepository } from '../contracts/user_repository.js'

export class UserRepository implements IUserRepository {
  
  public async getByEmailAsync(email: string): Promise<User> {
    return User.query().where('email', email).firstOrFail()
  }

  public async existsOtherUserWithEmailAsync(email: string, ignoreUserId: number): Promise<boolean> {
    const user = await User.query()
      .where('email', email)
      .andWhere('id', '!=', ignoreUserId)
      .first()

    return !!user
  }

  public async verifyCredentialsAsync(email: string, password: string): Promise<User> {
    const user = await User.query()
      .where('email', email)
      .andWhere('password', password)
      .firstOrFail()

    return user
  }

  public async getStudentByIdAsync(id: number): Promise<User> {
    return await User.query()
      .where('id', id)
      .andWhere('active', true)
      .andWhere('role', UserRole.STUDENT)
      .preload('student')
      .firstOrFail()
  }

  public async getTeacherByIdAsync(id: number): Promise<User> {
    return await User.query()
      .where('id', id)
      .andWhere('active', true)
      .andWhere('role', UserRole.TEACHER)
      .preload('teacher')
      .firstOrFail()
  }
}