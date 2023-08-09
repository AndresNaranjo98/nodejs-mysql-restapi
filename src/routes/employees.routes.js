import { Router } from 'express'
import {getEmployees, getEmployee, getEmployeeXLSX,
     postEmployees, putEmployees, deleteEmployees} from '../controllers/employees.controller.js'

const router = Router()

router.get('/employees', getEmployees)
router.get('/employees/excel', getEmployeeXLSX)
router.get('/employees/:id', getEmployee)
router.post('/employees', postEmployees)
router.put('/employees/:id', putEmployees)
router.delete('/employees/:nombre_usuario', deleteEmployees)

export default router