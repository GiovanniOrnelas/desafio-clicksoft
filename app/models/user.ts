import { column, hasOne } from '@adonisjs/lucid/orm'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import AppBaseModel from './appBaseModel.js'
import Teacher from './teacher.js'
import Student from './student.js'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import { UserRole } from '../enumerator/user_role.js'
import Administrator from './administrator.js'

export default class User extends AppBaseModel {

  @column()
  declare name: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare role: UserRole

  @hasOne(() => Teacher)
  declare teacher: HasOne<typeof Teacher>

  @hasOne(() => Student)
  declare student: HasOne<typeof Student>

  @hasOne(() => Administrator)
  declare administrator: HasOne<typeof Administrator>

  static accessTokens = DbAccessTokensProvider.forModel(User, {
    expiresIn: '30 days',
    prefix: 'oat_',
    table: 'auth_access_tokens',
    type: 'auth_token',
    tokenSecretLength: 40,
  })

  update(name: string, email: string, password?: string): void {
    this.name = name
    this.email = email
    if (password !== undefined) this.password = password
  }

  desactivate(): void {
    this.active = false
  }
}