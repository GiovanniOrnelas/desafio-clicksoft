import Classroom from '#models/classroom'
import { IClassroomRepository } from '../contracts/classroom_repository.js'

export class ClassroomRepository implements IClassroomRepository {
    public async getByIdAsync(classroomId: number): Promise<Classroom> {
        return await Classroom.query()
            .where('active', true)
            .andWhere('id', classroomId)
            .preload('user', (userQuery) => {
                userQuery.preload('teacher')
            })
            .firstOrFail()
    }

    public async getByNumberAsync(classroomNumber: number): Promise<Classroom | null> {
        return await Classroom.query()
            .where('active', true)
            .andWhere('number', classroomNumber)
            .preload('user', (userQuery) => {
                userQuery.preload('teacher')
            })
            .first()
    }

    public async getByTeacherIdAsync(classroomId: number, teacherId: number): Promise<Classroom> {
        return await Classroom.query()
            .where('id', classroomId)
            .andWhere('active', true)
            .andWhere('teacherId', teacherId)
            .firstOrFail()
    }

    public async existOtherClassroomWithTheSameNumberAsync(classroomId: number, classroomNumber: number): Promise<boolean> {
        const exist = await Classroom.query()
            .where('number', classroomNumber)
            .andWhere('id', '!=', classroomId)
            .first()

        return !!exist
    }
}