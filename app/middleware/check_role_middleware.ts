import { HttpContext } from '@adonisjs/core/http'
import { UserRole } from '../enumerator/user_role.js'

export default function checkRole(allowedRoles: UserRole[]) {
  return async ({ auth, response }: HttpContext, next: () => Promise<void>) => {
    try {
      const user = await auth.use('api').authenticate()
      if (!allowedRoles.includes(user.role)) {
        return response.unauthorized({ message: 'Insufficient permissions' })
      }
      await next()
    } catch {
      return response.unauthorized({ message: 'Not authenticated' })
    }
  }
}