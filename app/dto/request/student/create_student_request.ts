import { DateTime } from "luxon"

export interface CreateStudentRequest {
  name: string
  email: string
  password: string
  registration: string
  birthdate: DateTime
}