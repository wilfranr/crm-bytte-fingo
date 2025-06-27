import express from "express";
import multer from "multer";
import processExcel from "../controllers/reporte-informacion.controller.js";

const router = express.Router();

// Configuración de multer
const upload = multer({ dest: "uploads/" });

// Ruta para procesar el archivo
router.post("/upload", upload.single("file"), processExcel);

export default router;
