import { DateTime } from "luxon"

export interface UpdateTeacherRequest {
  name: string
  email: string
  password?: string
  birthdate?: DateTime
}