// student.js
import express from 'express';
// import authenticateStudent from '../middleware/authenticateStudent.js';
import { getStudentById, getStudentDashboard } from '../controllers/StudentController.js';

const router = express.Router();

// Ruta para obtener el dashboard del estudiante
router.get('/',  getStudentDashboard);
router.get('/:id',  getStudentById);

// authenticateStudent,
export default router;

