import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import InviteToken from "../models/inviteToken.model.js";

const router = express.Router();
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

const isProduction = process.env.NODE_ENV === "production";
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: isProduction, // true solo en producción
  sameSite: isProduction ? "strict" : "lax", // "lax" en desarrollo local
};

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

    const payload = {
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    const accessToken = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });

    res
      .cookie("accessToken", accessToken, {
        ...COOKIE_OPTIONS,
        maxAge: 15 * 60 * 1000,
      })
      .cookie("refreshToken", refreshToken, {
        ...COOKIE_OPTIONS,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
  } catch (error) {
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
});

router.post("/refresh", (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token)
    return res.status(401).json({ message: "Refresh token no proporcionado" });
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const payload = {
      userId: decoded.userId,
    };
    const accessToken = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "15m",
    });
    res.cookie("accessToken", accessToken, {
      ...COOKIE_OPTIONS,
      maxAge: 15 * 60 * 1000,
    });
    res.json({ ok: true });
  } catch {
    res.status(401).json({ message: "Refresh token inválido" });
  }
});

router.post("/logout", (_req, res) => {
  res.clearCookie("accessToken", COOKIE_OPTIONS);
  res.clearCookie("refreshToken", COOKIE_OPTIONS);
  res.json({ message: "Sesión cerrada" });
});

export default router;
