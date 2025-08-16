import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY;

const authMiddleware = (req, res, next) => {
  console.log('[AUTH MIDDLEWARE] Starting authentication check');
  console.log('[AUTH MIDDLEWARE] SECRET_KEY exists:', !!SECRET_KEY);
  
  let token = req.cookies?.accessToken;
  console.log('[AUTH MIDDLEWARE] Token from cookies:', token ? 'EXISTS' : 'NOT FOUND');
  
  if (!token) {
    const authHeader = req.headers["authorization"];
    console.log('[AUTH MIDDLEWARE] Auth header:', authHeader);
    token = authHeader && authHeader.split(" ")[1];
    console.log('[AUTH MIDDLEWARE] Token from header:', token ? 'EXISTS' : 'NOT FOUND');
  }

  if (!token) {
    console.log('[AUTH MIDDLEWARE] No token found, returning 401');
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  try {
    console.log('[AUTH MIDDLEWARE] Verifying token...');
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log('[AUTH MIDDLEWARE] Token verified successfully:', decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('[AUTH MIDDLEWARE] Token verification failed:', err);
    return res.status(401).json({ message: "Token inválido" });
  }
};

export default authMiddleware;
