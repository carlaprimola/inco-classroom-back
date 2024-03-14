// import jwt from 'jsonwebtoken';

// export const authenticateUser = (req, res, next) => {
//     // Obtener el token de autorización de la cabecera de la solicitud
//     const token = req.headers.authorization;

//     if (!token) {
//         return res.status(401).json({ message: 'No se proporcionó un token de autorización' });
//     }

//     // Verificar y decodificar el token JWT
//     jwt.verify(token, 'secret_key', (err, decoded) => {
//         if (err) {
//             return res.status(401).json({ message: 'Token inválido' });
//         }
        
//         // Agregar los datos decodificados al objeto de solicitud para su uso posterior
//         req.user = decoded;
//         next();
//     });
// };




import jwt from 'jsonwebtoken';

export const authenticateUser = (req, res, next) => {
    // Obtener el token de autorización de la cabecera de la solicitud
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'No se proporcionó un token de autorización' });
    }

    // Verificar y decodificar el token JWT
    jwt.verify(token.split(' ')[1], 'secret_key', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido' });
        }
        
        // Agregar los datos decodificados al objeto de solicitud para su uso posterior
        req.user = decoded;
        next();
    });
};

