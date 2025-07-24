import express from 'express';
const router = express.Router();
import multer from 'multer';
import { procesarArchivoCasb } from '../controllers/facturacionCasb.controller.js';

const upload = multer({ dest: 'uploads/' });

router.post(
  '/procesarCasb',
  upload.single('file'),
  /**
   * @swagger
   * /api/facturacionCasb/procesarCasb:
   *   post:
   *     summary: Procesa un archivo Excel de transacciones CASB y devuelve el consolidado.
   *     tags: [Facturación CASB]
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             type: object
   *             properties:
   *               file:
   *                 type: string
   *                 format: binary
   *                 description: Archivo Excel de transacciones CASB (xlsx, xls).
   *     responses:
   *       200:
   *         description: Archivo procesado y descargado con éxito.
   *         content:
   *           application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
   *             schema:
   *               type: string
   *               format: binary
   *       400:
   *         description: No se ha subido ningún archivo.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *       500:
   *         description: Error al procesar el archivo.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   */
  procesarArchivoCasb,
);

export default router;
