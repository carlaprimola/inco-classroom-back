import jwt from 'jsonwebtoken';
import { verifyToken } from '../middleware/authMiddleware'; // Importa la función a probar

// Mock de solicitud y respuesta para las pruebas
const mockRequest = (token) => ({
    header: jest.fn().mockReturnValue(token)
});

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe('Authentication Middleware', () => {
    it('should pass authentication with valid token', async () => {
        const req = mockRequest('valid_token'); // Crea una solicitud de prueba con un token válido
        const res = mockResponse(); // Crea una respuesta de prueba

        // Simula la función verify de jwt
        jwt.verify = jest.fn().mockReturnValue({ userId: 1 });

        const next = jest.fn(); // Mock de la función next

        // Llama a la función a probar
        await verifyToken(req, res, next);

        // Verifica que se haya llamado a la función verify de jwt con el token y la clave secreta
        expect(jwt.verify).toHaveBeenCalledWith('valid_token', 'secret_key');

        // Verifica que se haya asignado el usuario decodificado al objeto de solicitud
        expect(req.user).toEqual({ userId: 1 });

        // Verifica que se haya llamado a la función next
        expect(next).toHaveBeenCalled();
    });

    it('should return 401 if token is not provided', async () => {
        const req = mockRequest(null); // Crea una solicitud de prueba sin token
        const res = mockResponse(); // Crea una respuesta de prueba

        const next = jest.fn(); // Mock de la función next

        // Llama a la función a probar
        await verifyToken(req, res, next);

        // Verifica que se haya devuelto un estado 401 y un mensaje de error
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'Token de acceso no proporcionado' });

        // Verifica que la función next no haya sido llamada
        expect(next).not.toHaveBeenCalled();
    });

    it('should return 403 if token is invalid', async () => {
        const req = mockRequest('invalid_token'); // Crea una solicitud de prueba con un token inválido
        const res = mockResponse(); // Crea una respuesta de prueba

        // Simula un error al verificar el token
        jwt.verify = jest.fn().mockImplementation(() => {
            throw new Error('Invalid token');
        });

        const next = jest.fn(); // Mock de la función next

        // Llama a la función a probar
        await verifyToken(req, res, next);

        // Verifica que se haya devuelto un estado 403 y un mensaje de error
        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({ message: 'Token de acceso inválido', error: new Error('Invalid token') });

        // Verifica que la función next no haya sido llamada
        expect(next).not.toHaveBeenCalled();
    });
});
