import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:4200",
  credentials: true
}));

// Middleware para logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  console.log('Cookies:', req.cookies);
  console.log('Headers:', req.headers);
  next();
});

// Endpoint de prueba para access
app.get("/api/access", (req, res) => {
  console.log('Access endpoint called');
  console.log('User cookies:', req.cookies);
  
  // Simular respuesta exitosa
  res.json([
    {
      _id: "test123",
      portalName: "Portal de Prueba",
      url: "https://example.com",
      username: "testuser",
      password: "testpass"
    }
  ]);
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor de prueba corriendo en el puerto ${PORT}`);
});
