// student.js
import express from 'express';
// import authenticateStudent from '../middleware/authenticateStudent.js';
import { getStudentDashboard } from '../controllers/StudentController.js';

const router = express.Router();

// Ruta para obtener el dashboard del estudiante
router.get('/',  getStudentDashboard);

// authenticateStudent,
export default router;

