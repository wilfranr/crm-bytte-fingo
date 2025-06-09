const express = require("express");
const multer = require("multer");
const { processExcel } = require("../controllers/reporte-informacion.controller");

const router = express.Router();

// Configuración de multer
const upload = multer({ dest: "uploads/" });

// Ruta para procesar el archivo
router.post("/upload", upload.single("file"), processExcel);

module.exports = router;
