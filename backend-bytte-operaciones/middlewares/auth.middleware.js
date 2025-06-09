const jwt = require("jsonwebtoken");

const SECRET_KEY = "secret_key";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token no proporcianado" });
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token invalido o expirado" });
  }
};

module.exports = authMiddleware;
