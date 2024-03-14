import UsersModel from "../models/UsersModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
    const { Email, Contraseña } = req.body;
    try {
        // Buscamos el usuario por su correo electrónico
        const user = await UsersModel.findOne({ where: { Email: Email } });
        if (!user) {
            return res.status(400).json({ message: "Este correo no existe" });//no existe este correo
        }

        // Verificamos la contraseña
        const validPassword = await bcrypt.compare(Contraseña, user.Contraseña);//contraseña invalida
        if (!validPassword) {
            return res.status(400).json({ message: "Contraseña inválida" });
        }

        // Generamos el token JWT
        // const token = jwt.sign({ userId: user.id, email: user.Email }, 'secret_key', { expiresIn: '1h' });
        const token = jwt.sign({ userId: user.id, email: user.Email }, 'secret_key', { expiresIn: '3h' });
        console.log("🔐Este es mi token🔐:",token)

        // Enviamos la respuesta con el token y los datos del usuario
        res.status(200).json({ message: "Inicio de sesión correcto", token });
    } catch (error) {
        res.status(500).json({ message: "Error en el inicio de sesión", error });
    }
};
