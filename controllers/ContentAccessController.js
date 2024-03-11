// ContentAccessController.js

const CoursesModel = require('../models/CoursesModel.js'); // Importa el modelo de Curso

// Middleware para verificar el acceso al contenido basado en el rol del usuario
const checkContentAccess = async (req, res, next) => {
    const courseId = req.params.courseId; // Suponiendo que el ID del curso se pasa como parámetro
    const userRole = req.user.role; // Suponiendo que el rol del usuario está en req.user.role

    try {
        const course = await Course.findByPk(courseId); // Busca el curso en la base de datos por su ID

        if (!course) {
            return res.status(404).json({ message: 'Curso no encontrado' });
        }

        // Verifica si el usuario tiene acceso al contenido del curso según su rol
        if (userRole === 'Estudiante') {
            // Lógica para verificar acceso para estudiantes
            next();
        } else if (userRole === 'Docente') {
            // Lógica para verificar acceso para docentes
            next();
        } else {
            return res.status(401).json({ message: 'Acceso no autorizado' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al buscar el curso' });
    }
}

module.exports = {
    checkContentAccess
};
