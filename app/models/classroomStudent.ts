import { column, belongsTo } from '@adonisjs/lucid/orm'
import Classroom from './classroom.js'
import Student from './student.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import AppBaseModel from './appBaseModel.js'

export default class ClassroomStudent extends AppBaseModel {
  @column()
  declare classroomId: number

  @column()
  declare studentId: number

  @belongsTo(() => Classroom, {
    foreignKey: 'classroomId',
  })
  declare classroom: BelongsTo<typeof Classroom>

  @belongsTo(() => Student, {
    foreignKey: 'studentId',
  })
  declare student: BelongsTo<typeof Student>

  desactivate(): void {
    this.active = false
  }
}