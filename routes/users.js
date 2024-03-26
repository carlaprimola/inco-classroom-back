// import express from "express";
// import { createUser, deleteUser, updateUser, getUserById, getUsers } from "../controllers/UsersController.js";



// const routes = express.Router();

// routes.get('/', getUsers);
// routes.get('/:id', getUserById);
// routes.post('/', createUser);
// routes.put('/:id', updateUser);
// routes.delete("/:id", deleteUser);

// export default routes;


import express from "express";
import { verifyToken } from "../middleware/verifyToken.js"; 
import { createUser, deleteUser, updateUser, getUserById, getUsers } from "../controllers/UsersController.js";

const routes = express.Router();

// Ruta protegida con el middleware verifyToken
routes.get('/',verifyToken, getUsers);
routes.get('/:id',verifyToken, getUserById);
// Otras rutas sin protección
routes.post('/', createUser);
routes.put('/:id', updateUser);
routes.delete("/:id", deleteUser);

export default routes;
