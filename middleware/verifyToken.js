import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.header("userstoken");
    if (!token) {
        return res.status(401).json({ message: "Token de acceso no proporcionado" });
    }
    try {
        const decoded = jwt.verify(token, 'secret_key');
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        res.status(403).json({ message: "Token de acceso inválido", error });
    }
};
