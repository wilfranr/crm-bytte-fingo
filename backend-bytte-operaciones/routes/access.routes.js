const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const Access = require("../models/access.model");
const router = express.Router();

router.use(authMiddleware);
router.get("/", async (req, res) => {
  try {
    const accesses = await Access.find({ user: req.user.userId });
    res.json(accesses);
  } catch (error) {
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

module.exports = router;
