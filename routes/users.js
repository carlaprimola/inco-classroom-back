import express from "express";
import { createUser, deleteUser, updateUser, getUserById, getUsers } from "../controllers/UsersController.js";

const routes = express.Router();

routes.get('/', getUsers);
routes.get('/:id', getUserById);
routes.post('/', createUser);
routes.put('/:id', updateUser);
routes.delete("/:id", deleteUser);

export default routes;
