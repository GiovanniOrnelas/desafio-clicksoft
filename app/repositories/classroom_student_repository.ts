import ClassroomStudent from '#models/classroomStudent'
import { IClassroomStudentRepository } from '../contracts/classroom_student_repository.js'

export class ClassroomStudentRepository implements IClassroomStudentRepository{
    public async getQuantityStudentsByClassroomIdAsync(classroomId: number): Promise<number> {
        const classroomStudentCount = await ClassroomStudent.query()
            .where('classroom_id', classroomId)
            .andWhere('active', true)
            .count('* as total')
            .firstOrFail()

        return classroomStudentCount!.$extras.total
    }

    public async getByStudentIdAndClassroomIdAsync(classroomId: number, studentId: number): Promise<ClassroomStudent | null> {
        var response = await ClassroomStudent.query()
            .where('classroom_id', classroomId)
            .andWhere('student_id', studentId)
            .preload('classroom')
            .preload('student', (studentQuery) => {
                studentQuery.preload('user')
            })
            .first()

        return response
    }

    public async getStudentsByClassroomIdAsync(classroomId: number): Promise<ClassroomStudent[]> {
        return await ClassroomStudent.query()
            .where('classroom_id', classroomId)
            .andWhere('active', true)
            .preload('student', (studentQuery) => {
                studentQuery.preload('user')
            })
            .preload('classroom')
    }

    public async getClassroomsByStudentIdAsync(studentId: number): Promise<ClassroomStudent[]> {
        return await ClassroomStudent.query()
            .where('student_id', studentId)
            .andWhere('active', true)
            .preload('student', (studentQuery) => {
                studentQuery.preload('user')
            })
            .preload('classroom', (classroomQuery) => {
                classroomQuery.preload('user', (userQuery) => {
                    userQuery.preload('teacher')
                })
            })
    }
}