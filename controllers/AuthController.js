// AuthController.js

import jwt from 'jsonwebtoken';
import UsersModel from '../models/UsersModel.js';
import RolesModel from '../models/RolesModel.js';


export const loginUser = async (req, res) => {
    const { email, contraseña } = req.body;

    try {
        // Busca al usuario por su correo electrónico en la base de datos
        const user = await UsersModel.findOne({ 
            where: { Email: email },
            include: [RolesModel] // Incluir la relación con el modelo de roles
        });

        // Verifica si el usuario existe y si la contraseña es válida
        if (!user || user.Contraseña !== contraseña) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Genera el token JWT utilizando la clave secreta
        const token = jwt.sign({ userId: user.ID, roleId: user.roles_ID }, 'tu_clave_secreta', { expiresIn: '1h' });

        // Devuelve el token como respuesta
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al iniciar sesión', error });
    }
};
