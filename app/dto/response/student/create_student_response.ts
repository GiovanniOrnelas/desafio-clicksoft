import { DateTime } from "luxon"

export interface CreateStudentResponse {
  id: number
  name: string
  email: string
  registration: string
  birthdate: DateTime
}