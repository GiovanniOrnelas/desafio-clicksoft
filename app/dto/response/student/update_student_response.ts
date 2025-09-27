import { DateTime } from "luxon"

export interface UpdateStudentResponse {
  id: number
  name: string
  email: string
  registration: string
  birthdate: DateTime
}