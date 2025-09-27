import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class Administrator extends BaseModel {
  @column({ isPrimary: true })
  declare userId: number

  @column()
  declare name: string

  @column()
  declare email: string

  @belongsTo(() => User, { foreignKey: 'userId' })
  declare user: BelongsTo<typeof User>
}