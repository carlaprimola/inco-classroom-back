import UsersModel from "../models/UsersModel.js";

// Método para obtener todos los usuarios
export const getUsuarios = async (req, res) => {
    try {
        const usuarios = await UsersModel.findAll();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los usuarios", error });
    }
}

// Método para obtener un usuario por su ID
export const getUsuarioById = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await UsersModel.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el usuario", error });
    }
}

// Método para crear un usuario
export const createUsuario = async (req, res) => {
    const { Nombre, Email, Contraseña, TipoUsuario } = req.body;
    try {
        const nuevoUsuario = await UsersModel.create({
            Nombre,
            Email,
            Contraseña,
            TipoUsuario
        });
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el usuario", error });
    }
}

// Método para actualizar un usuario
export const updateUsuario = async (req, res) => {
    const { id } = req.params;
    const { Nombre, Email, Contraseña, TipoUsuario } = req.body;
    try {
        const usuarioExistente = await UsersModel.findByPk(id);
        if (!usuarioExistente) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        await usuarioExistente.update({
            Nombre,
            Email,
            Contraseña,
            TipoUsuario
        });
        res.status(200).json({ message: "Usuario actualizado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el usuario", error });
    }
}

// Método para eliminar un usuario
export const deleteUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const usuarioEliminado = await UsersModel.destroy({ where: { id } });
        if (!usuarioEliminado) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.status(200).json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el usuario", error });
    }
}
