import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import ReporteInformacionRoutes from "./routes/reporte_informacion.routes.js";
import AccessRoutes from "./routes/access.routes.js";
import AuthRoutes from "./routes/auth.routes.js";
import UserRoutes from "./routes/user.routes.js";
import InviteRoutes from "./routes/invite.routes.js";
import FacturacionRoutes from "./routes/facturacion.routes.js";
import FacturacionCasbRoutes from "./routes/facturacionCasb.routes.js";
import ClienteRoutes from "./routes/cliente.routes.js";
import TarjetaRoutes from "./routes/tarjeta.routes.js";
import LocationRoutes from "./routes/location.routes.js";
import { setupSwaggerDocs } from "./utils/swagger.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 3000;

const mongoUri = process.env.MONGODB_URI;

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  retryWrites: true
});

const corsOptions = {
  origin: "http://localhost:4200",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// Rutas públicas
app.use("/api/auth", AuthRoutes);
app.use("/api/locations", LocationRoutes);

// Configuración de Swagger
setupSwaggerDocs(app, PORT);

// Middleware de autenticación
// app.use(authMiddleware);

// Rutas protegidas
app.use("/api/reporte", ReporteInformacionRoutes);
app.use("/api/access", AccessRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/invite", InviteRoutes);
app.use("/api/facturacion", FacturacionRoutes);
app.use("/api/facturacionCasb", FacturacionCasbRoutes);
app.use("/api/clientes", ClienteRoutes);
app.use("/api/tarjetas", TarjetaRoutes);

app.use("/docs", express.static(path.resolve(__dirname, "../docs")));

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});