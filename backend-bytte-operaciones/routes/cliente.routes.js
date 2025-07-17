import { Router } from 'express';
import { getClientes } from '../controllers/cliente.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', authMiddleware, getClientes);

export default router;