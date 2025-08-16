import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import Access from "../models/access.model.js";
const router = express.Router();

// Middleware de logging para debugging
router.use((req, res, next) => {
  console.log(`[ACCESS ROUTES] ${req.method} ${req.path}`);
  console.log('[ACCESS ROUTES] Cookies:', req.cookies);
  console.log('[ACCESS ROUTES] Headers:', req.headers);
  next();
});

// Endpoint de prueba sin autenticación
router.get("/test", (req, res) => {
  console.log('[ACCESS ROUTES] Test endpoint called');
  res.json({ message: "Test endpoint working", timestamp: new Date().toISOString() });
});

router.use(authMiddleware);

router.get("/", async (req, res) => {
  console.log('[ACCESS ROUTES] GET / called');
  console.log('[ACCESS ROUTES] User from middleware:', req.user);
  
  try {
    const accesses = await Access.find({ user: req.user.userId });
    console.log('[ACCESS ROUTES] Found accesses:', accesses);
    
    // Asegurar que la respuesta sea JSON válido
    res.setHeader('Content-Type', 'application/json');
    res.json(accesses);
  } catch (error) {
    console.error('[ACCESS ROUTES] Error:', error);
    res.status(500).json({ error: "Error al obtener los accesos." });
  }
});

router.post("/", async (req, res) => {
  try {
    const newAccess = new Access({
      ...req.body,
      user: req.user.userId,
    });
    await newAccess.save();
    res.status(201).json(newAccess);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el acceso." });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedAccess = await Access.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    res.json(updatedAccess);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el acceso." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Access.findByIdAndDelete(req.params.id);
    res.json({ message: "Acceso eliminado correctamente." });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el acceso." });
  }
});

export default router;
