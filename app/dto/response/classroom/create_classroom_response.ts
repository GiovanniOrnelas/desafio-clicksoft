import { GetTeacherResponse } from "../teacher/get_teacher_response.js"

export interface CreateClassroomResponse {
    id: number
    number: number
    capacity: number
    teacher: GetTeacherResponse
}