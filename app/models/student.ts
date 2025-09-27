import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import Classroom from './classroom.js'
import User from './user.js'
import { DateTime } from 'luxon'

export default class Student extends BaseModel {
    @column()
    declare registration: string

    @column.dateTime()
    declare birthdate: DateTime

    @column({ isPrimary: true })
    declare userId: number

    @manyToMany(() => Classroom)
    declare classrooms: ManyToMany<typeof Classroom>

    @belongsTo(() => User, { foreignKey: 'userId' })
    declare user: BelongsTo<typeof User>

    update(birthdate?: DateTime): void {
        if (birthdate !== undefined) this.birthdate = birthdate
    }
}