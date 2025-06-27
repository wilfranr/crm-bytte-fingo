import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY;

const authMiddleware = (req, res, next) => {
  let token = req.cookies?.accessToken;
  if (!token) {
    const authHeader = req.headers["authorization"];
    token = authHeader && authHeader.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido" });
  }
};

export default authMiddleware;
