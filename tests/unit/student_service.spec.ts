import { test } from '@japa/runner'
import { DateTime } from 'luxon'

import StudentService from '#services/student_service'

const fakeUser = {
  id: 1,
  name: 'John',
  email: 'john@test.com',
  student: {
    registration: '12345678',
    birthdate: new Date(),
    updateCalled: false,
    update(data: any) {
      this.updateCalled = true
      this.birthdate = data
    },
    useTransaction(trx: any) { return this },
    save: async () => {},
  },
  updateCalled: false,
  update(name: string, email: string, password: string) {
    this.updateCalled = true
    this.name = name
    this.email = email
  },
  useTransaction(trx: any) { return this },
  save: async () => {},
}

test.group('StudentService - get & update', (group) => {
  let service: StudentService
  let mockUserRepository: any

  group.setup(() => {
    mockUserRepository = {
      getStudentByIdAsync: async (id: number) => {
        if (id === fakeUser.id) return fakeUser
        return null
      },
      existsOtherUserWithEmailAsync: async () => false,
    }

    service = new StudentService(mockUserRepository)
  })

  test('findById - should return a student successfully', async ({ assert }) => {
    const result = await service.findById(fakeUser.id)

    assert.equal(result.id, fakeUser.id)
    assert.equal(result.name, fakeUser.name)
    assert.equal(result.email, fakeUser.email)
    assert.equal(result.registration, fakeUser.student.registration)
    assert.equal(result.birthdate.toString(), fakeUser.student.birthdate.toString())
  })

  test('update - should update a student successfully', async ({ assert }) => {
    const input = {
      name: 'John Updated',
      email: 'john.updated@test.com',
      password: 'newpassword',
      birthdate: DateTime.fromJSDate(new Date()),
    }

    const result = await service.update(fakeUser.id, input)

    assert.isTrue(fakeUser.student.updateCalled)
    assert.isTrue(fakeUser.updateCalled)

    assert.equal(result.id, fakeUser.id)
    assert.equal(result.name, input.name)
    assert.equal(result.email, input.email)
    assert.equal(result.registration, fakeUser.student.registration)
    assert.equal(result.birthdate.toString(), fakeUser.student.birthdate.toString())
  })
})