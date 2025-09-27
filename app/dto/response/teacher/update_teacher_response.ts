import { DateTime } from "luxon"

export interface UpdateTeacherResponse {
  id: number
  name: string
  email: string
  registration: string
  birthdate: DateTime
}