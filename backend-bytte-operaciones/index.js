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
import authMiddleware from "./middlewares/auth.middleware.js";
import InviteRoutes from "./routes/invite.routes.js";
import FacturacionRoutes from "./routes/facturacion.routes.js";
import { setupSwaggerDocs } from "./utils/swagger.js";

const app = express();
const PORT = process.env.PORT || 3000;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const mongoUri = process.env.MONGODB_URI;

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const corsOptions = {
  origin: "http://localhost:4200", // Frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// Rutas de autenticación (públicas)
app.use("/api/auth", AuthRoutes);

// Configuración de Swagger (pública)
setupSwaggerDocs(app, PORT);

// Middleware de autenticación (protege las rutas siguientes)
app.use(authMiddleware);

// Rutas protegidas
app.use("/api/reporteinformacion", ReporteInformacionRoutes);
app.use("/api/access", AccessRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/invite", InviteRoutes);
app.use("/api/facturacion", FacturacionRoutes);

app.use("/docs", express.static(path.resolve(__dirname, "../docs")));

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});

