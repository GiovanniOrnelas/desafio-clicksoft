import vine from '@vinejs/vine';
export const createTeacherValidator = vine.compile(vine.object({
    name: vine.string().trim().minLength(2),
    email: vine.string().email(),
    password: vine.string().minLength(6),
    registration: vine.string(),
    birthdate: vine.date()
}));
export const updateTeacherValidator = vine.compile(vine.object({
    name: vine.string().trim().minLength(2),
    email: vine.string().email(),
    password: vine.string().minLength(6).optional(),
    birthdate: vine.date().optional()
}));
//# sourceMappingURL=teacher_validator.js.map