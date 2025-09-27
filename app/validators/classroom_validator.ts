import vine from '@vinejs/vine'

export const createClassroomValidator = vine.compile(
  vine.object({
    teacherId: vine.number(),
    number: vine.number(),
    capacity: vine.number()
  })
)

export const updateClassroomValidator = vine.compile(
  vine.object({
    number: vine.number(),
    capacity: vine.number()
  })
)