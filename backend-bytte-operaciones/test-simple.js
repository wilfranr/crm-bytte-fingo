import express from "express";
import cors from "cors";

const app = express();
const PORT = 3002;

app.use(cors({
  origin: "http://localhost:4200",
  credentials: true
}));

// Endpoint simple de prueba
app.get("/api/test", (req, res) => {
  console.log("Test endpoint called");
  res.json({ message: "Test successful", timestamp: new Date().toISOString() });
});

// Endpoint que simula el problema
app.get("/api/access", (req, res) => {
  console.log("Access endpoint called");
  console.log("Cookies:", req.cookies);
  console.log("Headers:", req.headers);
  
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
  console.log(`🚀 Servidor de prueba simple corriendo en el puerto ${PORT}`);
});
