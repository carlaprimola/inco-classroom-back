export const checkPermissions = (requiredRole) => {
    return (req, res, next) => {
        const { role } = req.user;
        if (role !== requiredRole) {
            return res.status(403).json({ message: "Acceso no autorizado" });
        }
        next();
    };
};
