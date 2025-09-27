import { GetTeacherResponse } from "../teacher/get_teacher_response.js"

export interface UpdateClassroomResponse {
    id: number
    number: number
    capacity: number
    teacher: GetTeacherResponse
    avaibility: boolean
}