import { Router } from 'express';
import { getDashboard, testMySQLConnection } from '../controllers/dashboard.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Endpoints para el panel de control
 */

/**
 * @swagger
 * /api/dashboard:
 *   get:
 *     summary: Obtiene los datos para el panel de control
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Datos del panel de control obtenidos correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalClientes:
 *                   type: integer
 *                   description: Número total de clientes
 *                 ventasHoy:
 *                   type: number
 *                   format: float
 *                   description: Total de ventas del día actual
 *                 ticketsPendientes:
 *                   type: integer
 *                   description: Número de tickets pendientes
 *                 ingresosMensuales:
 *                   type: number
 *                   format: float
 *                   description: Ingresos totales del mes actual
 *                 ultimasTransacciones:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID de la transacción
 *                       cliente:
 *                         type: string
 *                         description: Nombre del cliente
 *                       monto:
 *                         type: number
 *                         format: float
 *                         description: Monto de la transacción
 *                       fecha:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha de la transacción
 *       500:
 *         description: Error al obtener los datos del panel de control
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 */
router.get('/', authMiddleware, getDashboard);

/**
 * @swagger
 * /api/dashboard/test-mysql:
 *   get:
 *     summary: Prueba la conexión a MySQL
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Conexión a MySQL exitosa
 *       500:
 *         description: Error al conectar a MySQL
 */
router.get('/test-mysql', testMySQLConnection);

export default router;
