import jwt from 'jsonwebtoken';
import UsersModel from '../models/UsersModel.js';

const authenticateStudent = async (req, res, next) => {
    // Obtener el token del encabezado de autorización
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'No se proporcionó un token de autenticación' });
    }

    try {
        // Verificar el token
        const decoded = jwt.verify(token, 'incoclavesecreta'); 
        const userId = decoded.userId;

        // Verificar si el usuario es un estudiante
        const user = await UsersModel.findByPk(userId);
        if (!user) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        // Verificar si el usuario tiene el rol de estudiante
        if (user.roles_ID !== 'Estudiante') {
            return res.status(403).json({ message: 'No tienes permiso para acceder a esta ruta' });
        }

        // Si todo está bien, pasa al siguiente middleware
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Token inválido' });
    }
};

export default authenticateStudent;
