import express from "express";
import { createCourse, deleteCourse, updateCourse, getCourseById, getCourses } from "../controllers/CoursesController.js";
import { checkPermissions } from "../middleware/checkPermissions.js";
import { verifyToken } from "../middleware/verifyToken.js";

// const router = express.Router();
// router.get('/',getCourses);
// router.get('/:id', getCourseById);
// router.post('/', createCourse);
// router.put('/:id',  updateCourse);
// router.delete("/:id",  deleteCourse);



// Rutas protegidas para el controlador de cursos

const router = express.Router();
router.get('/',verifyToken, getCourses);
router.get('/:id',verifyToken, getCourseById);
//asegurando que el usuario ha iniciado sesión y que solo puede acceder el docente
router.post('/', verifyToken, checkPermissions('Docente'), createCourse);
router.put('/:id', verifyToken, checkPermissions('Docente'), updateCourse);
router.delete("/:id", verifyToken, checkPermissions('Docente'), deleteCourse);


export default router;

