// import { UsersModel } from "../models/UsersModel.js"

// //Verificar si el usuario es profesor
// export const verifyRole = async(req, res, next) => {
//     const id = req.user.id //busca por id
//     const userRole = await UsersModel.findById(id)
//     if (userRole.role !== req.user.role) { //verifica si el role coincide
//         res.status(401).json({message: "Acceso denegado"}) //si no coincide...
//     }next()
// }

//copiado de login-express