import StudentModel from '../models/StudentModel.js';
import CoursesModel from '../models/CoursesModel.js';
import AcademicTrackingModel from '../models/AcademicTrackingModel.js';
import UsersModel from '../models/UsersModel.js';
import ContentModel from '../models/ContentModel.js';
import RolesModel from '../models/RolesModel.js';

export const getStudents = async (req, res) => {
    try {
        const role = await RolesModel.findOne( {where: { TipoRol: 'Estudiante' }});

        if (role) {
            const studentInfo = await StudentModel.findAll({
                include: [
                    {
                        model: UsersModel,
                        where: { roles_ID: role.ID}
                        
                    },
                    {
                        model: CoursesModel,
                        include: [
                            {
                                model: ContentModel,
                            },
                        ],
                    },
                    AcademicTrackingModel,
                ],
            });

            res.status(200).json(studentInfo);
            console.log("Ficha estudiante 📕 ",studentInfo)
        } else {
            res.status(404).json({ message: 'No se encontró el rol de Estudiante' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener la información del estudiante", error });
        
    }
};


export const getStudentById = async (req, res) => {
    try {
        const { id } = req.params;
        const role = await RolesModel.findOne({ where: { TipoRol: 'Estudiante' } });

        if (!role) {
            return res.status(404).json({ message: 'No se encontró el rol de Estudiante' });
        }

        const studentInfo = await StudentModel.findOne({
            where: { usuarios_ID: id },
            include: [
                {
                    model: UsersModel,
                    where: { roles_ID: role.ID }
                },
                {
                    model: CoursesModel,
                    include: [
                        {
                            model: ContentModel,
                        },
                    ],
                },
                {
                    model: AcademicTrackingModel // Incluir seguimiento académico asociado al estudiante
                }
            ],
        });

        if (!studentInfo) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }

        res.status(200).json(studentInfo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener la información del estudiante', error });
    }
};

//Mostrar los cursos del estudiante
export const getStudentCourses = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await StudentModel.findOne({ where: { ID: id } });

        if (!student) {
            return res.status(404).json({ message: "Estudiante no encontrado" });
        }

        const studentID = student.dataValues.ID; 

        
        const studentCourses = await CoursesModel.findAll({
            where: { ID: studentID }, 
            include: [
                {
                    model: ContentModel,
                },
            ],
        });
        
        res.status(200).json(studentCourses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener los cursos del estudiante", error });
    }
};



