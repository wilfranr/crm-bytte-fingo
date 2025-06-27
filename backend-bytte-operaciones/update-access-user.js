import mongoose from "mongoose";
import "dotenv/config";
import Access from "./models/access.model.js";

const userId = "6841d646e3a366ad995fed92";

async function updateAccesses() {
  const mongoUri = process.env.MONGODB_URI;
  await mongoose.connect(mongoUri);

  const result = await Access.updateMany(
    { user: { $exists: false } }, // Solo los que no tienen usuario aún
    { $set: { user: userId } },
  );

  await mongoose.disconnect();
}

updateAccesses().catch((err) => {
  /* Error handling intentionally silent */
  mongoose.disconnect();
});
