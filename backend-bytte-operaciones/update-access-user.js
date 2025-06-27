import mongoose from "mongoose";
import Access from "./models/access.model.js";

const userId = "6841d646e3a366ad995fed92";

async function updateAccesses() {
  await mongoose.connect(
    "mongodb+srv://wilfranrivera:HmV2XnqWt9wI2OUD@clusterbytte.qhcax.mongodb.net/?retryWrites=true&w=majority&appName=ClusterBytte",
  );

  const result = await Access.updateMany(
    { user: { $exists: false } }, // Solo los que no tienen usuario aún
    { $set: { user: userId } },
  );

  console.log(`Documentos modificados: ${result.modifiedCount}`);
  await mongoose.disconnect();
}

updateAccesses().catch((err) => {
  console.error("Error actualizando Access:", err);
  mongoose.disconnect();
});
