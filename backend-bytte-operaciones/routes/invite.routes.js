const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const InviteToken = require("../models/inviteToken.model");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

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

module.exports = router;
