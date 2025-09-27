import Classroom from '#models/classroom';
export class ClassroomRepository {
    async getByIdAsync(classroomId) {
        return await Classroom.query()
            .where('active', true)
            .andWhere('id', classroomId)
            .preload('user', (userQuery) => {
            userQuery.preload('teacher');
        })
            .firstOrFail();
    }
    async getByNumberAsync(classroomNumber) {
        return await Classroom.query()
            .where('active', true)
            .andWhere('number', classroomNumber)
            .preload('user', (userQuery) => {
            userQuery.preload('teacher');
        })
            .first();
    }
    async getByTeacherIdAsync(classroomId, teacherId) {
        return await Classroom.query()
            .where('id', classroomId)
            .andWhere('active', true)
            .andWhere('teacherId', teacherId)
            .firstOrFail();
    }
    async existOtherClassroomWithTheSameNumberAsync(classroomId, classroomNumber) {
        const exist = await Classroom.query()
            .where('number', classroomNumber)
            .andWhere('id', '!=', classroomId)
            .first();
        return !!exist;
    }
}
//# sourceMappingURL=classroom_repository.js.map