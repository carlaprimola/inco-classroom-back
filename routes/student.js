// student.js
import express from 'express';
// import authenticateStudent from '../middleware/authenticateStudent.js';
import { getStudentById, getStudents } from '../controllers/StudentController.js';
import {verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/', verifyToken, getStudents);
router.get('/:id', verifyToken, getStudentById);

// authenticateStudent,
export default router;

