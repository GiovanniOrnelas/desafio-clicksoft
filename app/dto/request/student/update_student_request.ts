import { DateTime } from "luxon"

export interface UpdateStudentRequest {
  name: string
  email: string
  password?: string
  birthdate?: DateTime
}