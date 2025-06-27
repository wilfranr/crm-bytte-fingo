export default function (allowedRoles) {
  return function (req, res, next) {
    // Verifica si el usuario está autenticado
    if (!req.user || !req.user.role) {
      return res.status(403).json({ message: "Acceso denegado" });
    }

    // Verifica si el rol del usuario está permitido
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Acceso denegado" });
    }

    next();
  };
}
