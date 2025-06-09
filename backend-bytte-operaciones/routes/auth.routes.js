const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const router = express.Router();

//Registro de usuario
const InviteToken = require("../models/inviteToken.model");

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, token } = req.body;
    if (!token)
      return res
        .status(400)
        .json({ message: "Token de invitación requerido." });

    // Verifica si el token existe y es válido
    const invite = await InviteToken.findOne({ token });
    if (!invite)
      return res
        .status(400)
        .json({ message: "Token de invitación inválido o expirado." });

    // Elimina el token para que no se use de nuevo
    await InviteToken.deleteOne({ token });

    // Resto del registro
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });
    await user.save();

    res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar usuario" });
  }
});

//Login de usuario
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Usuario no encontrado" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ message: "Contraseña incorrecta" });

    // Incluye el nombre en el token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      "secret_key",
      { expiresIn: "2h" },
    );

    res.json({ token });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
});

module.exports = router;
