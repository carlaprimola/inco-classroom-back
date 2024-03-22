import AcademicTrackingModel from "../models/AcademicTrackingModel.js";

// Método para obtener todos los registros de seguimiento académico
export const getAllAcademicData = async (req, res) => {
    try {
        const academicData = await AcademicTrackingModel.findAll();
        res.status(200).json(academicData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener los datos de seguimiento académico", error });
    }
}

// Método para obtener un registro de seguimiento académico por su ID
export const getAcademicDataById = async (req, res) => {
    const { id } = req.params;
    try {
        const academicData = await AcademicTrackingModel.findByPk(id);
        if (!academicData) {
            return res.status(404).json({ message: "Datos de seguimiento académico no encontrados" });
        }
        res.status(200).json(academicData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener los datos de seguimiento académico", error });
    }
}

// Método para crear un nuevo registro de seguimiento académico
export const createAcademicData = async (req, res) => {
    const { Curso, Actividades, Comentarios, Notas,Estado } = req.body;
    try {
        const newAcademicData = await AcademicTrackingModel.create({
            Curso,
            Actividades,
            Comentarios,
            Notas,
            Estado
           
        });
        res.status(201).json(newAcademicData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear los datos de seguimiento académico", error });
    }
}

// Método para actualizar un registro de seguimiento académico existente
export const updateAcademicData = async (req, res) => {
    const { id } = req.params;
    const { Curso, Actividades, Comentarios, Notas,Estado } = req.body;
    try {
        const academicData = await AcademicTrackingModel.findByPk(id);
        if (!academicData) {
            return res.status(404).json({ message: "Datos de seguimiento académico no encontrados" });
        }
        await academicData.update({
            Curso,
            Actividades,
            Comentarios,
            Notas,
            Estado
        });
        res.status(200).json({ message: "Datos de seguimiento académico actualizados correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar los datos de seguimiento académico", error });
    }
}

// Método para eliminar un registro de seguimiento académico
export const deleteAcademicData = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await AcademicTrackingModel.destroy({ where: { ID: id } });
        if (!result) {
            return res.status(404).json({ message: "Datos de seguimiento académico no encontrados" });
        }
        res.status(200).json({ message: "Datos de seguimiento académico eliminados correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar los datos de seguimiento académico", error });
    }
}
