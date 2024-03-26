import jwt from 'jsonwebtoken';
import UsersModel from '../models/UsersModel.js';
import authenticateUser from '../middleware/authenticateUser'; // Importa el middleware a probar

describe('Authentication Middleware', () => {
    it('should authenticate user with valid token', () => {
        // Simula una solicitud HTTP con un token válido
        const req = {
            headers: {
                authorization: 'valid_token',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();

        // Simula la función findByPk del modelo de usuarios
        UsersModel.findByPk = jest.fn().mockResolvedValue({ id: 1 }); // Supongamos que el usuario se encuentra en la base de datos

        // Simula la función verify del módulo jsonwebtoken
        jwt.verify = jest.fn().mockReturnValue({ ID: 1 }); // Supongamos que el token es válido y decodificado correctamente

        // Llama al middleware a probar
        authenticateUser(req, res, next);

        // Verifica que la función findByPk del modelo de usuarios se haya llamado con el ID decodificado del token
        expect(UsersModel.findByPk).toHaveBeenCalledWith(1);

        // Verifica que la función verify del módulo jsonwebtoken se haya llamado con el token de autorización
        expect(jwt.verify).toHaveBeenCalledWith('valid_token', 'secret_key');

        // Verifica que el siguiente middleware se haya llamado después de la autenticación exitosa
        expect(next).toHaveBeenCalled();
    });
});
