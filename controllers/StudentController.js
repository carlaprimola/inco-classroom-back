// //studentController.js
// import StudentModel from '../models/StudentModel.js';
// import CoursesModel from '../models/CoursesModel.js';
// import AcademicTrackingModel from '../models/AcademicTrackingModel.js';


// export const getStudentDashboard = async (req, res) => {
//     try {
//         const studentID = req.user.id;

//         const studentInfo = await StudentModel.findOne({
//             where: { usuarios_ID: studentID },
//             include: [CoursesModel, AcademicTrackingModel],
//         });

//         res.status(200).json(studentInfo);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Error al obtener la información del estudiante", error });
//     }
// };

// studentController.js

import StudentModel from '../models/StudentModel.js';
import CoursesModel from '../models/CoursesModel.js';
import AcademicTrackingModel from '../models/AcademicTrackingModel.js';
import UsersModel from '../models/UsersModel.js';

export const getStudentDashboard = async (req, res) => {
    try {
        // Aquí iría la lógica para obtener el tablero del estudiante
        // Sin verificar la autenticación del usuario
        
        // Ejemplo de consulta a la base de datos
        const studentInfo = await StudentModel.findOne({
            where: { /* Condición para encontrar al estudiante */ },
            include: [CoursesModel, UsersModel, AcademicTrackingModel],
        });

        // Devolver la información del estudiante
        res.status(200).json(studentInfo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener la información del estudiante", error });
    }
};
