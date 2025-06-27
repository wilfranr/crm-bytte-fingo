import { Router } from "express";
const router = Router();
import User from "../models/user.model.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";

// Obtener lista de usuarios (solo admin)
router.get(
  "/",
  authMiddleware,
  roleMiddleware(["admin"]),
  async (_req, res) => {
    const users = await User.find({}, "-password"); // No envía el hash de password
    res.json(users);
  },
);

// (Opcional) Obtener usuario por id
router.get(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin", "user"]),
  async (req, res) => {
    const user = await User.findById(req.params.id, "-password");
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(user);
  },
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin", "user"]),
  async (req, res) => {
    try {
      const { name, email, role } = req.body;
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { name, email, role },
        { new: true, select: "-password" },
      );
      if (!user)
        return res.status(404).json({ message: "Usuario no encontrado" });
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar el usuario" });
    }
  },
);

// (Opcional) Eliminar usuario
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Usuario eliminado correctamente" });
  },
);

export default router;
