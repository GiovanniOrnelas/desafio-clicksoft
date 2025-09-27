interface ClassroomResponse {
  teacherName: string
  classroomNumber: number
}

export interface GetClassroomStudentResponse {
  studentName: string | null
  classrooms: ClassroomResponse[]
}