import User from "#models/user"

export interface IUserRepository {
    getByEmailAsync(email: string): Promise<User>
    existsOtherUserWithEmailAsync(email: string, ignoreUserId: number): Promise<boolean>
    verifyCredentialsAsync(email: string, password: string): Promise<User>
    getStudentByIdAsync(id: number): Promise<User>
    getTeacherByIdAsync(id: number): Promise<User>
}
