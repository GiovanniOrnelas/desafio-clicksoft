import ClassroomStudent from '#models/classroomStudent';
export class ClassroomStudentRepository {
    async getQuantityStudentsByClassroomIdAsync(classroomId) {
        const classroomStudentCount = await ClassroomStudent.query()
            .where('classroom_id', classroomId)
            .andWhere('active', true)
            .count('* as total')
            .firstOrFail();
        return classroomStudentCount.$extras.total;
    }
    async getByStudentIdAndClassroomIdAsync(classroomId, studentId) {
        var response = await ClassroomStudent.query()
            .where('classroom_id', classroomId)
            .andWhere('student_id', studentId)
            .preload('classroom')
            .preload('student', (studentQuery) => {
            studentQuery.preload('user');
        })
            .first();
        return response;
    }
    async getStudentsByClassroomIdAsync(classroomId) {
        return await ClassroomStudent.query()
            .where('classroom_id', classroomId)
            .andWhere('active', true)
            .preload('student', (studentQuery) => {
            studentQuery.preload('user');
        })
            .preload('classroom');
    }
    async getClassroomsByStudentIdAsync(studentId) {
        return await ClassroomStudent.query()
            .where('student_id', studentId)
            .andWhere('active', true)
            .preload('student', (studentQuery) => {
            studentQuery.preload('user');
        })
            .preload('classroom', (classroomQuery) => {
            classroomQuery.preload('user', (userQuery) => {
                userQuery.preload('teacher');
            });
        });
    }
}
//# sourceMappingURL=classroom_student_repository.js.map