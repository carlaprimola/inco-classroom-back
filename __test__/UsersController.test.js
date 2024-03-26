// Importa las funciones del controlador a probar
import * as UserController from '../controllers/UsersController';

// Importa el modelo de usuarios
import UsersModel from '../models/UsersModel';

// Importa el modelo de roles
import RolesModel from '../models/RolesModel';

// Importa la librería bcrypt para el hashing de contraseñas
import bcrypt from 'bcrypt';

// Importa la librería jwt para la generación de tokens
import jwt from 'jsonwebtoken';

// Mock de datos de usuario para las pruebas
const mockUser = {
    id: 1,
    Nombre: 'John Doe',
    Email: 'johndoe@example.com',
    Contraseña: 'hashedPassword',
    roles_ID: 1,
    imgProfile: 'profile.jpg'
};

// Mock de solicitud y respuesta para las pruebas
const mockRequest = (params, body) => ({
    params,
    body
});

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

// Mock de la función hash de bcrypt
jest.mock('bcrypt', () => ({
    hash: jest.fn().mockResolvedValue('hashedPassword')
}));

// Mock de la función sign de jwt
jest.mock('jsonwebtoken', () => ({
    sign: jest.fn().mockReturnValue('token')
}));

describe('User Controller', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Limpia todos los mocks después de cada prueba
    });

    describe('createUser function', () => {
        it('should create a new user', async () => {
            const req = mockRequest({}, mockUser); // Crea una solicitud de prueba
            const res = mockResponse(); // Crea una respuesta de prueba

            // Simula la función findOne del modelo de usuarios
            UsersModel.findOne = jest.fn().mockResolvedValue(null);

            // Simula la función create del modelo de usuarios
            UsersModel.create = jest.fn().mockResolvedValue(mockUser);

            // Llama a la función a probar
            await UserController.createUser(req, res);

            // Verifica que se haya llamado a la función hash de bcrypt
            expect(bcrypt.hash).toHaveBeenCalledWith('hashedPassword', 10);

            // Verifica que se haya llamado a la función create del modelo de usuarios
            expect(UsersModel.create).toHaveBeenCalledWith({
                Nombre: 'John Doe',
                Email: 'johndoe@example.com',
                Contraseña: 'hashedPassword',
                roles_ID: 1,
                imgProfile: 'profile.jpg'
            });

            // Verifica que se haya llamado a la función sign de jwt
            expect(jwt.sign).toHaveBeenCalledWith({ userId: 1, email: 'johndoe@example.com' }, 'secret_key', { expiresIn: '1h' });

            // Verifica que se haya devuelto una respuesta con el usuario creado y el token
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ message: 'Usuario creado exitosamente', user: mockUser, token: 'token' });
        });

        it('should return an error if email is already in use', async () => {
            const req = mockRequest({}, mockUser); // Crea una solicitud de prueba
            const res = mockResponse(); // Crea una respuesta de prueba

            // Simula la función findOne del modelo de usuarios
            UsersModel.findOne = jest.fn().mockResolvedValue(mockUser);

            // Llama a la función a probar
            await UserController.createUser(req, res);

            // Verifica que se haya devuelto una respuesta de error
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'El correo electrónico ya está en uso' });
        });

        it('should return an error if createUser function fails', async () => {
            const req = mockRequest({}, mockUser); // Crea una solicitud de prueba
            const res = mockResponse(); // Crea una respuesta de prueba

            // Simula la función findOne del modelo de usuarios
            UsersModel.findOne = jest.fn().mockResolvedValue(null);

            // Simula un error al crear el usuario
            UsersModel.create = jest.fn().mockRejectedValue(new Error('Error creating user'));

            // Llama a la función a probar
            await UserController.createUser(req, res);

            // Verifica que se haya devuelto una respuesta de error
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error al crear el usuario', error: new Error('Error creating user') });
        });
    });
});
