import jwt from 'jsonwebtoken';
import UsersModel from '../models/UsersModel.js';

const authenticateUser = async (req, res, next) => {
    try {
        // Obtener el token de autorización de la cabecera de la solicitud
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ message: 'No se proporcionó un token de autorización' });
        }console.log("Token 🧨:", token)

        // Verificar y decodificar el token JWT
        const decodedToken = jwt.verify(token, 'secret_key');

        // Verificar si el usuario asociado al token existe en la base de datos
        const user = await UsersModel.findByPk(decodedToken.ID);

        if (!user) {
            return res.status(401).json({ message: 'Usuario no autorizado' });
        }

        // Adjuntar el usuario autenticado al objeto de solicitud para su posterior uso
        req.user = user;

        
        next();
    } catch (error) {
        // Manejar errores de autenticación
        return res.status(401).json({ message: 'Token de autorización inválido', error: error.message });
    }console.log(error)
};

export default authenticateUser;