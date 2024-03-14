import CoursesModel from "../models/CoursesModel.js";
import ContentModel from "../models/ContentModel.js";

// Método para obtener todos los Cursos
export const getCourses = async (req, res) => {
    try {
        // Obtener el usuario autenticado del objeto de solicitud
        const { role } = req.user;

        let courses;

        // Verificar el rol del usuario para determinar qué cursos mostrar
        if (role === 'Estudiante') {
            // Si el usuario es un estudiante, mostrar solo los cursos asociados a ese estudiante
            const studentId = req.user.userId; // Suponiendo que el ID del estudiante está en el token
            courses = await CoursesModel.findAll({
                where: { studentId },
                include: [ContentModel],
            });
        } else if (role === 'Docente') {
            // Si el usuario es un profesor, mostrar todos los cursos (o filtrar según tu lógica)
            courses = await CoursesModel.findAll({
                include: [ContentModel],
            });
        } else {
            // Si el usuario no tiene un rol válido, devolver un error de acceso no autorizado
            return res.status(403).json({ message: 'Acceso no autorizado' });
        }

        res.status(200).json(courses);
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
    const { NombreCurso, imageUrl, contenidocurso_ID } = req.body;
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
