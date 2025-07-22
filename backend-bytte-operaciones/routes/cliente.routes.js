import { Router } from 'express';
import { getClientes } from '../controllers/cliente.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Clientes
 *   description: Gestión de clientes
 */

/**
 * @swagger
 * /api/clientes:
 *   get:
 *     summary: Obtiene y sincroniza clientes de Freshdesk con la base de datos local.
 *     tags: [Clientes]
 *     description: |-
 *       Este endpoint recupera los contactos con la etiqueta "Fingo" de Freshdesk,
 *       los sincroniza con la base de datos local (creando nuevos o actualizando existentes),
 *       y luego devuelve la lista de clientes desde la base de datos local.
 *     responses:
 *       200:
 *         description: Lista de clientes obtenida y sincronizada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Cliente'
 *       500:
 *         description: Error del servidor al obtener o sincronizar los clientes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get('/', authMiddleware, getClientes);

export default router;
