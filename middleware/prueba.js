// middleware/authMiddleware.js

const authMiddleware = (req, res, next) => {
  // Verificar si el usuario está autenticado (por ejemplo, utilizando JWT)
  // Código de verificación de autenticación...

  // Verificar si el usuario tiene el rol adecuado
  if (req.user.role !== 'admin') { // Por ejemplo, si solo los administradores pueden acceder
    return res.status(403).json({ message: 'No tienes permiso para acceder a esta ruta' });
  }

  next(); // Pasar la solicitud al siguiente middleware
};

module.exports = authMiddleware;

