import { GetTeacherResponse } from "../teacher/get_teacher_response.js"

export interface GetClassroomResponse {
    id: number
    number: number
    capacity: number
    teacher: GetTeacherResponse
    avaibility: boolean
}