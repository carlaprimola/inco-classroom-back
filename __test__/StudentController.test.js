import * as StudentController from '../controllers/StudentController';
import StudentModel from '../models/StudentModel';
import CoursesModel from '../models/CoursesModel';
import AcademicTrackingModel from '../models/AcademicTrackingModel';
import UsersModel from '../models/UsersModel';
import ContentModel from '../models/ContentModel';
import RolesModel from '../models/RolesModel';

// Mock de datos de estudiante para las pruebas
const mockStudent = {
    id: 1,
    nombre: 'John Doe',
    // Otros campos de estudiante...
};

// Mock de solicitud y respuesta para las pruebas
const mockRequest = (params) => ({ params });
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe('Student Controller', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Limpia todos los mocks después de cada prueba
    });

    describe('getStudents function', () => {
        it('should get all students', async () => {
            const req = mockRequest({});
            const res = mockResponse();

            // Simula la función findOne del modelo de roles
            RolesModel.findOne = jest.fn().mockResolvedValue({ ID: 1 });

            // Simula la función findAll del modelo de estudiantes
            StudentModel.findAll = jest.fn().mockResolvedValue([mockStudent]);

            // Simula la función include de Sequelize
            StudentModel.include = jest.fn();

            // Simula la función include de Sequelize
            CoursesModel.include = jest.fn();

            // Simula la función include de Sequelize
            ContentModel.include = jest.fn();

            // Llama a la función a probar
            await StudentController.getStudents(req, res);

            // Verifica que se haya llamado a la función findAll del modelo de estudiantes
            expect(StudentModel.findAll).toHaveBeenCalled();

            // Verifica que se haya devuelto una respuesta con la información de los estudiantes
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([mockStudent]);
        });

        it('should return an error if student role is not found', async () => {
            const req = mockRequest({});
            const res = mockResponse();

            // Simula la función findOne del modelo de roles
            RolesModel.findOne = jest.fn().mockResolvedValue(null);

            // Llama a la función a probar
            await StudentController.getStudents(req, res);

            // Verifica que se haya devuelto una respuesta de error
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'No se encontró el rol de Estudiante' });
        });
    });

    describe('getStudentById function', () => {
        it('should get a student by id', async () => {
            const req = mockRequest({ id: 1 });
            const res = mockResponse();

            // Simula la función findOne del modelo de roles
            RolesModel.findOne = jest.fn().mockResolvedValue({ ID: 1 });

            // Simula la función findOne del modelo de estudiantes
            StudentModel.findOne = jest.fn().mockResolvedValue(mockStudent);

            // Simula la función include de Sequelize
            StudentModel.include = jest.fn();

            // Simula la función include de Sequelize
            CoursesModel.include = jest.fn();

            // Simula la función include de Sequelize
            ContentModel.include = jest.fn();

            // Llama a la función a probar
            await StudentController.getStudentById(req, res);

            // Verifica que se haya llamado a la función findOne del modelo de estudiantes
            expect(StudentModel.findOne).toHaveBeenCalled();

            // Verifica que se haya devuelto una respuesta con la información del estudiante
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockStudent);
        });

        it('should return an error if student role is not found', async () => {
            const req = mockRequest({ id: 1 });
            const res = mockResponse();

            // Simula la función findOne del modelo de roles
            RolesModel.findOne = jest.fn().mockResolvedValue(null);

            // Llama a la función a probar
            await StudentController.getStudentById(req, res);

            // Verifica que se haya devuelto una respuesta de error
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'No se encontró el rol de Estudiante' });
        });

        it('should return an error if student is not found', async () => {
            const req = mockRequest({ id: 1 });
            const res = mockResponse();

            // Simula la función findOne del modelo de roles
            RolesModel.findOne = jest.fn().mockResolvedValue({ ID: 1 });

            // Simula la función findOne del modelo de estudiantes
            StudentModel.findOne = jest.fn().mockResolvedValue(null);

            // Llama a la función a probar
            await StudentController.getStudentById(req, res);

            // Verifica que se haya devuelto una respuesta de error
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Estudiante no encontrado' });
        });
    });
});
