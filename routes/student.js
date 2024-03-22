// student.js
import express from 'express';
// import authenticateStudent from '../middleware/authenticateStudent.js';
import { getStudentById, getStudents } from '../controllers/StudentController.js';
import {verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/', getStudents);
router.get('/:id',getStudentById);

// authenticateStudent,
export default router;

