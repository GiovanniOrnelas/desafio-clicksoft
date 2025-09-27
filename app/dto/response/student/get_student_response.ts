import { DateTime } from "luxon"

export interface GetStudentResponse {
    id: number,
    name: string
    email: string
    registration: string
    birthdate: DateTime
}