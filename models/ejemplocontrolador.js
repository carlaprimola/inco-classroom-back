// // controllers/adminController.js

// const express = require('express');
// const router = express.Router();
// const authMiddleware = require('../middleware/authMiddleware');

// // Ruta protegida que requiere autenticación y permisos de administrador
// router.get('/admin/dashboard', authMiddleware, (req, res) => {
//   // Lógica para la página de dashboard de administrador...
// });

// module.exports = router;


// middleware/authMiddleware.js

const authMiddleware = (req, res, next) => {
    // Verificar si el usuario está autenticado (por ejemplo, utilizando JWT)
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ message: 'Token de autenticación no proporcionado' });
    }
  
    // Verificar la validez del token y decodificarlo para obtener información sobre el usuario
    try {
      const decodedToken = decodeToken(token);
      req.user = decodedToken.user; // Establecer el usuario en el objeto req para su uso en otros middlewares o controladores
      next(); // Pasar la solicitud al siguiente middleware
    } catch (error) {
      return res.status(401).json({ message: 'Token de autenticación inválido' });
    }
  };
  
  module.exports = authMiddleware;