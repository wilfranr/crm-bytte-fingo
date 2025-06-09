const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const ReporteInformacionRoutes = require("./routes/reporte_informacion.routes");
const AccessRoutes = require("./routes/access.routes");
const AuthRoutes = require("./routes/auth.routes");

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
app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/auth", AuthRoutes);
app.use("/api/reporteinformacion", ReporteInformacionRoutes);
app.use("/api/access", AccessRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

const InviteRoutes = require("./routes/invite.routes");
app.use("/api/invite", InviteRoutes);
