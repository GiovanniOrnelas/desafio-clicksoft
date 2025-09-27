import { DateTime } from "luxon"

export interface GetTeacherResponse {
  id: number
  name: string
  email: string
  registration: string
  birthdate: DateTime
}