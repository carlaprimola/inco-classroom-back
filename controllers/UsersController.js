import UsersModel from "../models/UsersModel.js";

// Método para obtener todos los Users
export const getUsers = async (req, res) => {
    try {
        const Users = await UsersModel.findAll();
        res.status(200).json(Users);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los Users", error });
    }
}

// Método para obtener un User por su ID
export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const User = await UsersModel.findByPk(id);
        if (!User) {
            return res.status(404).json({ message: "User no encontrado" });
        }
        res.status(200).json(User);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el User", error });
    }
}

// Método para crear un User
export const createUser = async (req, res) => {
    const { Nombre, Email, Contraseña } = req.body; // Se elimina TipoUser ya que no está en el modelo
    try {
        const newUser = await UsersModel.create({
            Nombre,
            Email,
            Contraseña
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el User", error });
    }
}

// Método para actualizar un User
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { Nombre, Email, Contraseña } = req.body; // Se elimina TipoUser ya que no está en el modelo
    try {
        const UserExistente = await UsersModel.findByPk(id);
        if (!UserExistente) {
            return res.status(404).json({ message: "User no encontrado" });
        }
        await UserExistente.update({
            Nombre,
            Email,
            Contraseña
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
