import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import ReporteInformacionRoutes from "./routes/reporte_informacion.routes.js";
import AccessRoutes from "./routes/access.routes.js";
import AuthRoutes from "./routes/auth.routes.js";
import UserRoutes from "./routes/user.routes.js";
import authMiddleware from "./middlewares/auth.middleware.js";

const app = express();
const PORT = 3000;

mongoose
  .connect(
    "mongodb+srv://wilfranrivera:HmV2XnqWt9wI2OUD@clusterbytte.qhcax.mongodb.net/?retryWrites=true&w=majority&appName=ClusterBytte",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  )
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => {
    console.error("Error al conectar a MongoDB:", err);
    console.error("Detalles del error:", err.reason);
  });

const corsOptions = {
  origin: "http://localhost:4200", // Frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(express.json());
app.use(cors(corsOptions));
app.use("/api/auth", AuthRoutes);
app.use(authMiddleware);
app.use("/api/reporteinformacion", ReporteInformacionRoutes);
app.use("/api/access", AccessRoutes);
app.use("/api/users", UserRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

import InviteRoutes from "./routes/invite.routes.js";
app.use("/api/invite", InviteRoutes);
