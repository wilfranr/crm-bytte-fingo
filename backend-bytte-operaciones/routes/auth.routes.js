import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import InviteToken from "../models/inviteToken.model.js";

/**
 * @swagger
 * tags:
 *   name: Autenticación
 *   description: Endpoints para el manejo de usuarios y autenticación
 */

const router = express.Router();
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - token
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del usuario.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico del usuario.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Contraseña del usuario.
 *               token:
 *                 type: string
 *                 description: Token de invitación para el registro.
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente.
 *       400:
 *         description: Token de invitación inválido/expirado o usuario ya existe.
 *       500:
 *         description: Error del servidor al registrar usuario.
 */
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

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Inicia sesión de un usuario
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico del usuario.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Contraseña del usuario.
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso. Devuelve cookies de sesión (accessToken, refreshToken) y la información pública del usuario.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *       400:
 *         description: Usuario no encontrado o contraseña incorrecta.
 *       500:
 *         description: Error del servidor al iniciar sesión.
 */
router.post("/login", async (req, res) => {
  console.log('[LOGIN] Login attempt for email:', req.body.email);
  
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      console.log('[LOGIN] User not found:', email);
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      console.log('[LOGIN] Invalid password for user:', email);
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    console.log('[LOGIN] User authenticated successfully:', email);

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

    console.log('[LOGIN] Tokens generated, setting cookies...');
    console.log('[LOGIN] COOKIE_OPTIONS:', COOKIE_OPTIONS);

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
      
    console.log('[LOGIN] Login successful, response sent');
  } catch (error) {
    console.error('[LOGIN] Error during login:', error);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
});

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: Refresca el token de acceso
 *     tags: [Autenticación]
 *     description: Utiliza el refreshToken (en una cookie HTTP-only) para obtener un nuevo accessToken.
 *     responses:
 *       200:
 *         description: Token de acceso refrescado exitosamente. Se establece una nueva cookie de accessToken.
 *       401:
 *         description: Refresh token no proporcionado o inválido.
 */
router.post("/refresh", async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token)
    return res.status(401).json({ message: "Refresh token no proporcionado" });
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    const payload = {
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
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

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Cierra la sesión del usuario
 *     tags: [Autenticación]
 *     description: Elimina las cookies de accessToken y refreshToken, cerrando la sesión del usuario.
 *     responses:
 *       200:
 *         description: Sesión cerrada exitosamente.
 */
router.post("/logout", (_req, res) => {
  res.clearCookie("accessToken", COOKIE_OPTIONS);
  res.clearCookie("refreshToken", COOKIE_OPTIONS);
  res.json({ message: "Sesión cerrada" });
});

export default router;
