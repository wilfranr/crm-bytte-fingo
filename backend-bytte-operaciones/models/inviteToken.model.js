import mongoose from "mongoose";

const inviteTokenSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now, expires: "12h" }, // Expira en 12 horas
});

export default mongoose.model("InviteToken", inviteTokenSchema);
