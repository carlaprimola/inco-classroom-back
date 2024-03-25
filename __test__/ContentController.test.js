// Importación de módulos y creación de mocks
import { getContent, getContentById } from '../controllers/ContentController.js'; // Importa las funciones del controlador
import ContentModel from '../models/ContentModel.js'; // Importa el modelo

// Mockeo del modelo ContentModel para simular su comportamiento
jest.mock('../models/ContentModel', () => ({
    findAll: jest.fn(), // Simula la función findAll del modelo
    findByPk: jest.fn(), // Simula la función findByPk del modelo
    create: jest.fn(), // Simula la función create del modelo
    update: jest.fn(), // Simula la función update del modelo
    deleteOne: jest.fn(), // Simula la función deleteOne del modelo
}));

// Bloque principal de pruebas
describe('Content Controller', () => {
    // Limpia los mocks después de cada prueba
    afterEach(() => {
        jest.clearAllMocks();
    });

    // Prueba de la función getContent
    describe('getContent function', () => {
        it('should return all content courses', async () => {
            // Preparación de datos de prueba
            const mockContentCourses = [{ id: 1, title: 'Course 1' }, { id: 2, title: 'Course 2' }];
            ContentModel.findAll.mockResolvedValue(mockContentCourses); // Mockea la función findAll del modelo

            // Simulación de la solicitud y la respuesta
            const req = {};
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            // Llamada a la función getContent y verificación de la respuesta
            await getContent(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockContentCourses);
        });
    });

    // Prueba de la función getContentById
    describe('getContentById function', () => {
        it('should return content course by id', async () => {
            // Preparación de datos de prueba
            const mockContentCourse = { id: 1, title: 'Course 1' };
            ContentModel.findByPk.mockResolvedValue(mockContentCourse); // Mockea la función findByPk del modelo

            // Simulación de la solicitud y la respuesta
            const req = { params: { id: 1 } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            // Llamada a la función getContentById y verificación de la respuesta
            await getContentById(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockContentCourse);
        });

        it('should return 404 if content course does not exist', async () => {
            // Simula que el modelo no encuentra el curso de contenido
            ContentModel.findByPk.mockResolvedValue(null);
        
            // Simulación de la solicitud y la respuesta
            const req = { params: { id: 1 } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        
            // Llamada a la función getContentById y verificación de la respuesta
            await getContentById(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Temario no encontrado' }); // Corregido el mensaje esperado
        });
    });
});
