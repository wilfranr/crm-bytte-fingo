import express from 'express';
const router = express.Router();
import multer from 'multer';
import { procesarArchivo } from '../controllers/facturacion.controller.js';

const upload = multer({ dest: 'uploads/' });

router.post('/procesar', upload.single('file'), procesarArchivo);

export default router;
