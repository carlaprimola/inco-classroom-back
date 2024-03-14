// student.js
import express from 'express';
// import authenticateStudent from '../middleware/authenticateStudent.js';
import { getStudentById, getStudents } from '../controllers/StudentController.js';
import authenticateUser from '../middleware/authenticateUser.js';

const router = express.Router();

//Ruta para obtener el dashboard del estudiante
router.get('/', authenticateUser, getStudents);
router.get('/:id', authenticateUser, getStudentById);

// router.get('/', getStudents);
// router.get('/:id', getStudentById);


// authenticateStudent,
export default router;

