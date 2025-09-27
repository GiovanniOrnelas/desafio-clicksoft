import Classroom from "#models/classroom"

export interface IClassroomRepository {
    getByIdAsync(classroomId: number): Promise<Classroom>
    getByNumberAsync(classroomNumber: number): Promise<Classroom | null>
    getByTeacherIdAsync(classroomId: number, teacherId: number): Promise<Classroom>
    existOtherClassroomWithTheSameNumberAsync(classroomId: number, classroomNumber: number): Promise<boolean>
}
