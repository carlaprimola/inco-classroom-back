import UsersModel from "../models/UsersModel.js";
import RolesModel from "../models/RolesModel.js";
import  jwt  from "jsonwebtoken";
import bcrypt from "bcrypt";

// Método para obtener todos los Users
export const getUsers = async (req, res) => {
    try {
        const Users = await UsersModel.findAll({
            attributes: { exclude: ['Contraseña'] }, // Excluir el campo de la contraseña de la respuesta
            include: RolesModel 
        });
        res.status(200).json(Users);
    } catch (error) {
        console.error(error); // Imprime el error en la consola
        res.status(500).json({ message: "Error al obtener los Usuarios", error });
    }
}

// Método para obtener un User por su ID
export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const User = await UsersModel.findByPk(id, { 
            attributes: { exclude: ['Contraseña'] }, // Excluye el campo de contraseña de la respuesta
            include: RolesModel 
        });
        
        if (!User) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.status(200).json(User);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el Usuario", error });
    }
}

export const createUser = async (req, res) => {
    const { Nombre, Email, Contraseña, roles_ID, imgProfile } = req.body;
    try {
        // Verificar si el correo electrónico ya está en uso
        const existingUser = await UsersModel.findOne({ where: { Email: Email } });
        if (existingUser) {
            return res.status(400).json({ message: "El correo electrónico ya está en uso" });
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(Contraseña, 10);

        const newUser = await UsersModel.create({
            Nombre,
            Email,
            Contraseña: hashedPassword,
            roles_ID,
            imgProfile
        });

        // Generar el token JWT
        const token = jwt.sign({ userId: newUser.id, email: newUser.Email }, 'secret_key', { expiresIn: '1h' });

        // Enviar la respuesta con el token y los datos del usuario
        res.status(201).json({ message: "Usuario creado exitosamente", user: newUser, token });
    } catch (error) {
        res.status(500).json({ message: "Error al crear el usuario", error });
    }
};


// Método para actualizar un User
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { Nombre, Email, Contraseña, imgProfile } = req.body; // Se elimina TipoUser ya que no está en el modelo
    try {
        const UserExistente = await UsersModel.findByPk(id);
        if (!UserExistente) {
            return res.status(404).json({ message: "User no encontrado" });
        }
        await UserExistente.update({
            Nombre,
            Email,
            Contraseña, 
            imgProfile
        });
        res.status(200).json({ message: "User actualizado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el User", error });
    }
}

// Método para eliminar un User
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const UserEliminado = await UsersModel.destroy({ where: { id } });
        if (!UserEliminado) {
            return res.status(404).json({ message: "User no encontrado" });
        }
        res.status(200).json({ message: "User eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el User", error });
    }
}
