import { UserRole } from '../enumerator/user_role.js';
import User from '#models/user';
export class UserRepository {
    async getByEmailAsync(email) {
        return User.query().where('email', email).firstOrFail();
    }
    async existsOtherUserWithEmailAsync(email, ignoreUserId) {
        const user = await User.query()
            .where('email', email)
            .andWhere('id', '!=', ignoreUserId)
            .first();
        return !!user;
    }
    async verifyCredentialsAsync(email, password) {
        const user = await User.query()
            .where('email', email)
            .andWhere('password', password)
            .firstOrFail();
        return user;
    }
    async getStudentByIdAsync(id) {
        return await User.query()
            .where('id', id)
            .andWhere('active', true)
            .andWhere('role', UserRole.STUDENT)
            .preload('student')
            .firstOrFail();
    }
    async getTeacherByIdAsync(id) {
        return await User.query()
            .where('id', id)
            .andWhere('active', true)
            .andWhere('role', UserRole.TEACHER)
            .preload('teacher')
            .firstOrFail();
    }
}
//# sourceMappingURL=user_repository.js.map