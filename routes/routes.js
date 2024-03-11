import express from "express"
import { createCourse, deleteCourse, updateCourse, getCourseById, getCourses } from "../controllers/CoursesController.js";

const router = express.Router()
router.get('/',getCourses);
router.get('/:id',getCourseById);
router.post('/',createCourse);
router.put('/:id',updateCourse);
router.delete("/:id",deleteCourse);



export default router;