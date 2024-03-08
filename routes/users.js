import express from "express";
import { createUsuario, deleteUsuario, updateUsuario, getUsuarioById, getUsuarios } from "../controllers/UsersController.js";

const routes = express.Router();

routes.get('/', getUsuarios);
routes.get('/:id', getUsuarioById);
routes.post('/', createUsuario);
routes.put('/:id', updateUsuario);
routes.delete("/:id", deleteUsuario);

export default routes;
