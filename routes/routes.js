import express from "express"
import { createCurso, deleteCursos, updateCurso, getCursoById, getCursos } from "../controllers/CursosController.js";

const router = express.Router()
router.get('/',getCursos);
router.get('/:id',getCursoById);
router.post('/',createCurso);
router.put('/:id',updateCurso);
router.delete("/:id",deleteCursos);

export default router;