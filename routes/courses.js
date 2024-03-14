import express from "express";
import { createCourse, deleteCourse, updateCourse, getCourseById, getCourses } from "../controllers/CoursesController.js";
import { checkPermissions } from "../middleware/checkPermissions.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Rutas protegidas para el controlador de cursos
router.get('/', getCourses);
router.get('/:id', getCourseById);
router.post('/', verifyToken, checkPermissions('Docente'), createCourse);
router.put('/:id', verifyToken, checkPermissions('Docente'), updateCourse);
router.delete("/:id", verifyToken, checkPermissions('Docente'), deleteCourse);

export default router;
