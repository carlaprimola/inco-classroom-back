import StudentModel from '../models/StudentModel.js';
import CoursesModel from '../models/CoursesModel.js';
import AcademicTrackingModel from '../models/AcademicTrackingModel.js';
import UsersModel from '../models/UsersModel.js';
import ContentModel from '../models/ContentModel.js';

export const getStudentDashboard = async (req, res) => {
    try {
        // Consultar la información del estudiante incluyendo información del curso y su contenido
        const studentInfo = await StudentModel.findOne({
            // where: { /* Condición para encontrar al estudiante */ },
            include: [
                UsersModel,
                {
                    model: CoursesModel,
                    include: [
                        {
                            model: ContentModel, // Incluir el modelo de contenido de cursos
                        },
                    ],
                },
               
                AcademicTrackingModel,
            ],
        });

        // Devolver la información del estudiante
        res.status(200).json(studentInfo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener la información del estudiante", error });
    }
};


export const getStudentById = async (req, res) => {
    try {
        const { id } = req.params; // Suponiendo que la ID del estudiante está en los parámetros de la solicitud

        // Buscar al estudiante por su ID e incluir información sobre los cursos y su contenido
        const studentInfo = await StudentModel.findOne({
            where: { ID: id },
            include: [
                UsersModel,
                {
                    model: CoursesModel,
                    include: [
                        {
                            model: ContentModel, // Incluir el modelo de contenido de cursos
                        },
                    ],
                },
                AcademicTrackingModel,
            ],
        });

        if (!studentInfo) {
            return res.status(404).json({ message: "Estudiante no encontrado" });
        }

        // Devolver la información del estudiante
        res.status(200).json(studentInfo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener la información del estudiante", error });
    }
};
