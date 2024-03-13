import jwt from 'jsonwebtoken';

// Controlador de inicio de sesión
export const login = async (req, res) => {
    try {
        const user = req.user; // Suponiendo que el middleware authenticateUser ha almacenado el usuario autenticado en req.user

        if (!user) {
            return res.status(401).json({ message: 'Usuario no autenticado' });
        }

        // Genera un token JWT con la ID del usuario
        const token = jwt.sign({ userId: user.id }, 'mi_secreto', { expiresIn: '1h' });

        // Devuelve el token JWT en la respuesta
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al iniciar sesión", error });
    }
}
