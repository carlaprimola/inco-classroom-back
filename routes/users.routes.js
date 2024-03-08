import express from "express";
import { createUsuario, deleteUsuario, updateUsuario, getUsuarioById, getUsuarios } from "../controllers/UsersController.js";

const router = express.Router();

router.get('/', getUsuarios);
router.get('/:id', getUsuarioById);
router.post('/', createUsuario);
router.put('/:id', updateUsuario);
router.delete("/:id", deleteUsuario);

export default router;
