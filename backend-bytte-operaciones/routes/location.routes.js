import { Router } from 'express';
import { getColombiaLocations } from '../controllers/location.controller.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Locations
 *   description: Ubicaciones en Colombia
 */

/**
 * @swagger
 * /api/locations/colombia:
 *   get:
 *     summary: Lista departamentos y ciudades de Colombia
 *     tags: [Locations]
 *     responses:
 *       200:
 *         description: Datos de departamentos y ciudades
 */
router.get('/colombia', getColombiaLocations);

export default router;
