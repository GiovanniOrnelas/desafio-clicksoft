import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Classroom from './classroom.js'
import { DateTime } from 'luxon'
import User from './user.js'

export default class Teacher extends BaseModel {
  @column()
  declare registration: string

  @column.dateTime()
  declare birthdate: DateTime

  @column({ isPrimary: true })
  declare userId: number

  @hasMany(() => Classroom)
  declare classrooms: HasMany<typeof Classroom>

  @belongsTo(() => User, { foreignKey: 'userId' })
  declare user: BelongsTo<typeof User>

  update(birthdate?: DateTime): void {
    if (birthdate !== undefined) this.birthdate = birthdate
  }
}