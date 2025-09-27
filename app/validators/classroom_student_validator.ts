import vine from '@vinejs/vine'

export const createClassroomStudentValidator = vine.compile(
  vine.object({
    teacherId: vine.number(),
    classroomId: vine.number(),
    studentId: vine.number()
  })
)

export const deleteClassroomStudentValidator = vine.compile(
  vine.object({
    classroomId: vine.number(),
    studentId: vine.number()
  })
)