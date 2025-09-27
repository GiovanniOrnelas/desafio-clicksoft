import { GetClassroomResponse } from "../classroom/get_classroom_response.js";
import { GetStudentResponse } from "../student/get_student_response.js";
import { GetTeacherResponse } from "../teacher/get_teacher_response.js";

export interface CreateClassroomStudentResponse {
    teacher: GetTeacherResponse
    student: GetStudentResponse
    classroom: GetClassroomResponse
}