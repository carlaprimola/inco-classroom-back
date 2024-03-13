// student.js
import express from 'express';
// import authenticateStudent from '../middleware/authenticateStudent.js';
import { getStudentById, getStudentDashboard } from '../controllers/StudentController.js';
import { authenticateUser } from '../middleware/authMiddleware.js';

const router = express.Router();

// Ruta para obtener el dashboard del estudiante
router.get('/dashboard', authenticateUser, getStudentDashboard);
router.get('/:id', authenticateUser, getStudentById);

// authenticateStudent,
export default router;

