import express from "express";
import { createCourse, deleteCourse, updateCourse, getCourseById, getCourses } from "../controllers/CoursesController.js";
import { verifyToken } from "../middleware/verifyToken.js";


// Rutas protegidas para el controlador de cursos

const router = express.Router();
router.get('/',verifyToken, getCourses);
router.get('/:id',verifyToken, getCourseById);

router.post('/', verifyToken,  createCourse);
router.put('/:id', verifyToken,  updateCourse);
router.delete("/:id", verifyToken,  deleteCourse);


export default router;

