import { test } from '@japa/runner'
import { DateTime } from 'luxon'


import StudentService from '#services/student_service'

const fakeUser = {
  id: 1,
  name: 'John',
  email: 'john@test.com',
}

const fakeStudent = {
  registration: '12345678',
  birthdate: new Date(),
}

test.group('StudentService', (group) => {
  let service: StudentService
  let mockUserRepository: any

  group.setup(() => {
    mockUserRepository = {
      getStudentByIdAsync: async () => null,
      existsOtherUserWithEmailAsync: async () => false,
      getByEmailAsync: async () => null,
      verifyCredentialsAsync: async () => true,
      getTeacherByIdAsync: async () => null,
    }

    service = new StudentService(mockUserRepository)
  })

  test('create - should create a student successfully', async ({assert}) => {
    const User = {
      findBy: async () => null,
      create: async () => fakeUser,
    } as any

    const Student = {
      findBy: async () => null,
      create: async () => fakeStudent,
    } as any

    const db = {
      transaction: async () => ({
        commit: async () => {},
        rollback: async () => {},
      }),
    } as any

    const serviceWithMocks = new StudentService(mockUserRepository)
    ;(serviceWithMocks as any).User = User
    ;(serviceWithMocks as any).Student = Student
    ;(serviceWithMocks as any).db = db

    const input = {
      name: 'John',
      email: 'john@test.com',
      password: '123456',
      registration: '12345678',
      birthdate: DateTime.fromJSDate(new Date()),
    }

    const result = await serviceWithMocks.create(input)

    assert.equal(result.name, input.name)
  })
})
