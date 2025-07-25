import { Router } from 'express';
import { getClientes, updateCliente, getClienteById } from '../controllers/cliente.controller.js';
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

/**
 * @swagger
 * /api/clientes/{id}:
 *   get:
 *     summary: Obtiene un cliente por ID.
 *     tags: [Clientes]
 *     description: Recupera un cliente individual de la base de datos utilizando su ID único.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID único del cliente a recuperar.
 *     responses:
 *       200:
 *         description: Cliente encontrado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       404:
 *         description: Cliente no encontrado.
 *       500:
 *         description: Error del servidor al obtener el cliente.
 */
router.get('/:id', authMiddleware, getClienteById);

/**
 * @swagger
 * /api/clientes/{id}:
 *   put:
 *     summary: Actualiza un cliente por ID.
 *     tags: [Clientes]
 *     description: Actualiza la información de un cliente existente en la base de datos.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID único del cliente a actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cliente'
 *     responses:
 *       200:
 *         description: Cliente actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       404:
 *         description: Cliente no encontrado.
 *       500:
 *         description: Error del servidor al actualizar el cliente.
 */
router.put('/:id', authMiddleware, updateCliente);

export default router;
