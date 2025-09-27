import { column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import AppBaseModel from './appBaseModel.js'
import ClassroomStudent from './classroomStudent.js'
import User from './user.js'

export default class Classroom extends AppBaseModel {
    @column()
    declare number: number

    @column()
    declare capacity: number

    @column()
    declare teacherId: number

    @belongsTo(() => User, {
        foreignKey: 'teacherId',
    })
    declare user: BelongsTo<typeof User>

    @hasMany(() => ClassroomStudent)
    declare students: HasMany<typeof ClassroomStudent>

    update(number: number, capacity: number): void {
        this.number = number
        this.capacity = capacity
    }

    desactivate(): void {
        this.active = false
    }
}