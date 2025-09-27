interface StudentInClassroomResponse {
  id: number
  name: string
  email: string
  registration: string
}

export interface GetStudentsClassroomResponse {
  classroomId: number
  classroomNumber: number
  students: StudentInClassroomResponse[]
}