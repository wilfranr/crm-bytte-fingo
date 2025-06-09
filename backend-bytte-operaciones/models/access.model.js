const mongoose = require("mongoose");

const accessSchema = new mongoose.Schema({
  portalName: { type: String, required: true }, // Nombre del portal
  url: { type: String, required: true }, // URL del portal
  username: { type: String, required: true }, // Usuario
  password: { type: String, required: true }, // Contraseña
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Referencia al usuario
});

const Access = mongoose.model("Access", accessSchema);

module.exports = Access;
