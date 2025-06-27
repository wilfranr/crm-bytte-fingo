import express from "express";
import crypto from "crypto";
import InviteToken from "../models/inviteToken.model.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";

const router = express.Router();
// Solo admin puede generar tokens
router.post(
  "/generate",
  authMiddleware,
  roleMiddleware(["admin"]),
  async (req, res) => {
    const token = crypto.randomBytes(16).toString("hex");
    await InviteToken.create({ token });
    res.json({ token });
  },
);

export default router;
