import UsersModel from "../models/UsersModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Buscamos el usuario por su correo electrónico
        const user = await UsersModel.findOne({ where: { Email: email } });
        if (!user) {
            return res.status(400).json({ message: "Correo electrónico no válido" });
        }

        // Verificamos la contraseña
        const validPassword = await bcrypt.compare(password, user.Contraseña);
        if (!validPassword) {
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }

        // Generamos el token JWT
        const token = jwt.sign({ userId: user.ID, email: user.Email }, 'secret_key', { expiresIn: '3h' });

        // Enviamos la respuesta con el token y los datos del usuario
        res.status(200).json({ message: "Inicio de sesión correcto", token, user: { id: user.ID, email: user.Email, name: user.Nombre, role: user.Role } });

    } catch (error) {
        res.status(500).json({ message: "Error en el inicio de sesión", error });
    }
};
