import { DateTime } from "luxon"

export interface CreateTeacherRequest {
  name: string
  email: string
  password: string
  registration: string
  birthdate: DateTime
}