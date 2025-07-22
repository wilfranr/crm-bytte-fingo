
import { Router } from 'express';
import { addTarjeta, getTarjetasByCliente, getTotalTarjetasCount } from '../controllers/tarjeta.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Tarjetas
 *   description: Gestión de tarjetas entregadas a clientes
 */

/**
 * @swagger
 * /api/tarjetas:
 *   post:
 *     summary: Agrega una nueva tarjeta entregada a un cliente.
 *     tags: [Tarjetas]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - clientId
 *               - deliveryDate
 *             properties:
 *               clientId:
 *                 type: string
 *                 description: ID del cliente al que se le entrega la tarjeta.
 *                 example: "60d5ec49f8c7d00015f8e3b1" # Ejemplo de ObjectId
 *               deliveryDate:
 *                 type: string
 *                 format: date
 *                 description: Fecha de entrega de la tarjeta (YYYY-MM-DD).
 *                 example: "2023-10-26"
 *               cardNumber:
 *                 type: string
 *                 description: Número de la tarjeta (opcional).
 *                 example: "1234-5678-9012-3456"
 *     responses:
 *       201:
 *         description: Tarjeta agregada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tarjeta'
 *       400:
 *         description: Datos de entrada inválidos.
 *       401:
 *         description: No autorizado, token no proporcionado o inválido.
 *       404:
 *         description: Cliente no encontrado.
 *       500:
 *         description: Error interno del servidor.
 *
 * /api/tarjetas/cliente/{clientId}:
 *   get:
 *     summary: Obtiene todas las tarjetas entregadas a un cliente específico.
 *     tags: [Tarjetas]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: clientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del cliente para el cual se desean obtener las tarjetas.
 *         example: "60d5ec49f8c7d00015f8e3b1"
 *     responses:
 *       200:
 *         description: Lista de tarjetas obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tarjeta'
 *       401:
 *         description: No autorizado, token no proporcionado o inválido.
 *       404:
 *         description: Cliente no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */

router.post('/', authMiddleware, addTarjeta);
router.get('/cliente/:clientId', authMiddleware, getTarjetasByCliente);

/**
 * @swagger
 * /api/tarjetas/count:
 *   get:
 *     summary: Obtiene el conteo total de tarjetas entregadas.
 *     tags: [Tarjetas]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Conteo total de tarjetas obtenido exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   description: Número total de tarjetas entregadas.
 *                   example: 100
 *       401:
 *         description: No autorizado, token no proporcionado o inválido.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/count', authMiddleware, getTotalTarjetasCount);

export default router;
