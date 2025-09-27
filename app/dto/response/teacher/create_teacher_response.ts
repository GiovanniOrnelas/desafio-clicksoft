import { DateTime } from "luxon"

export interface CreateTeacherResponse {
  id: number
  name: string
  email: string
  registration: string
  birthdate: DateTime
}