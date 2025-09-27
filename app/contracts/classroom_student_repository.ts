import ClassroomStudent from "#models/classroomStudent"

export interface IClassroomStudentRepository {
    getQuantityStudentsByClassroomIdAsync(classroomId: number): Promise<number>
    getByStudentIdAndClassroomIdAsync(classroomId: number, studentId: number): Promise<ClassroomStudent | null>
    getStudentsByClassroomIdAsync(classroomId: number): Promise<ClassroomStudent[]>
    getClassroomsByStudentIdAsync(studentId: number): Promise<ClassroomStudent[]>
}
