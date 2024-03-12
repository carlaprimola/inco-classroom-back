import CoursesModel from "../models/CoursesModel.js";
import ContentModel from "../models/ContentModel.js";

// Método para obtener todos los Cursos
export const getCourses = async (req, res) => {
    try {
        const Courses = await CoursesModel.findAll({
            include: [ContentModel],
        });
        
        res.status(200).json(Courses);

        
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los Cursos", error });
    }
}

// Método para obtener un Curso por su ID
export const getCourseById = async (req, res) => {
    const { id } = req.params;
    try {
        const Course = await CoursesModel.findByPk(id);
        if (!Course) {
            return res.status(404).json({ message: "Curso no encontrado" });
        }
        res.status(200).json(Course);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el Curso", error });
    }
}

// Método para crear un Curso
export const createCourse = async (req, res) => {
    const { NombreCurso, imageUrl, contenidocursos_ID } = req.body;
    try {
        const newCourse = await CoursesModel.create({
            NombreCurso,
            imageUrl,
            contenidocurso_ID
        });
        res.status(201).json(newCourse);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el Curso", error });
    }
}

// Método para editar un Curso
export const updateCourse = async (req, res) => {
    const { id } = req.params;
    const { NombreCurso, imageUrl, contenidocurso_ID } = req.body;
    try {
        const CourseExistente = await CoursesModel.findByPk(id);
        if (!CourseExistente) {
            return res.status(404).json({ message: "Curso no encontrado" });
        }
        await CourseExistente.update({
            NombreCurso,
            imageUrl,
            contenidocurso_ID
        });
        res.status(200).json({ message: "Curso actualizado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al editar el Curso", error });
    }
}

// Método para eliminar un Curso
export const deleteCourse = async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await CoursesModel.destroy({ where: { id } });
        if (!resultado) {
            return res.status(404).json({ message: "Curso no encontrado" });
        }
        res.status(200).json({ message: "Curso eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el Curso", error });
    }
}
