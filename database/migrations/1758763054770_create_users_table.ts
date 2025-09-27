import { BaseSchema } from '@adonisjs/lucid/schema'
import { UserRole } from '../../app/enumerator/user_role.js'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('email', 255).notNullable().unique()
      table.string('name', 255).notNullable()
      table.string('password', 180).notNullable()
      table.enum('role', Object.values(UserRole)).notNullable()
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
      table.boolean('active').notNullable().defaultTo(true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}