import checkRole from '#middleware/check_role_middleware'
import router from '@adonisjs/core/services/router'
import { UserRole } from '../app/enumerator/user_role.js'
import { middleware } from './kernel.js'

const StudentsController = () => import('#controllers/students_controller')
const ClassroomsController = () => import('#controllers/classrooms_controller')
const ClassroomStudentsController = () => import('#controllers/classroom_students_controller')
const TeachersController = () => import('#controllers/teachers_controller')
const AuthController = () => import('#controllers/auth_controller')

router.group(() => {
  router.post('/', [StudentsController, 'store']).middleware(checkRole([UserRole.ADMINISTRATOR]))
  router.patch('/:id', [StudentsController, 'update']).middleware(checkRole([UserRole.STUDENT]))
  router.delete('/:id', [StudentsController, 'destroy']).middleware(checkRole([UserRole.STUDENT]))
  router.get('/:id', [StudentsController, 'show']).middleware(checkRole([UserRole.STUDENT]))
}).prefix('/students').middleware([middleware.auth()])

router.group(() => {
  router.post('/', [TeachersController, 'store']).middleware(checkRole([UserRole.ADMINISTRATOR]))
  router.patch('/:id', [TeachersController, 'update']).middleware(checkRole([UserRole.TEACHER]))
  router.delete('/:id', [TeachersController, 'destroy']).middleware(checkRole([UserRole.TEACHER]))
  router.get('/:id', [TeachersController, 'show']).middleware(checkRole([UserRole.TEACHER]))
}).prefix('/teachers').middleware([middleware.auth()])

router.group(() => {
  router.post('/', [ClassroomsController, 'store']).middleware(checkRole([UserRole.TEACHER]))
  router.patch('/:id', [ClassroomsController, 'update']).middleware(checkRole([UserRole.TEACHER]))
  router.delete('/:id', [ClassroomsController, 'destroy']).middleware(checkRole([UserRole.TEACHER]))
  router.get('/:id', [ClassroomsController, 'show']).middleware(checkRole([UserRole.TEACHER]))
}).prefix('/classrooms').middleware([middleware.auth()])

router.group(() => {
  router.post('/', [ClassroomStudentsController, 'store']).middleware(checkRole([UserRole.TEACHER]))
  router.delete('/', [ClassroomStudentsController, 'destroy']).middleware(checkRole([UserRole.TEACHER]))
  router.get('/by-classroom', [ClassroomStudentsController, 'indexByClassroom']).middleware(checkRole([UserRole.TEACHER]))
  router.get('/by-student', [ClassroomStudentsController, 'indexByStudent']).middleware(checkRole([UserRole.STUDENT]))
}).prefix('/classroom-students').middleware([middleware.auth()])

router.group(() => {
  router.post('/', [AuthController, 'login'])
}).prefix('/login')