import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class AuthAccessToken extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare tokenableId: number

  @column()
  declare type: string

  @column()
  declare name?: string

  @column()
  declare hash: string

  @column()
  declare abilities: string

  @column()
  declare createdAt: DateTime

  @column()
  declare updatedAt: DateTime

  @column()
  declare lastUsedAt?: DateTime

  @column()
  declare expiresAt?: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}