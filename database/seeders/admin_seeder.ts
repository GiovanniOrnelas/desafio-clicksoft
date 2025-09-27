import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import { UserRole } from '../../app/enumerator/user_role.js'
import Administrator from '#models/administrator'

export default class AdminSeeder extends BaseSeeder {
  public async run () {
    const user = await User.create({
      name: 'Giovanni Ornelas',
      email: 'giovanni-admin@clicksoft.com',
      password: '@Mudar123**',
      role: UserRole.ADMINISTRATOR,
    })

    await Administrator.create({
      userId: user.id
    })
  }
}