const mongoose = require("mongoose");

// Importa tu modelo de Access
const Access = require("./models/access.model"); // Ajusta la ruta si es necesario

// ID del usuario a asociar (pon aquí el ObjectId real del usuario)
const userId = "6841d646e3a366ad995fed92";

async function updateAccesses() {
  await mongoose.connect(
    "mongodb+srv://wilfranrivera:HmV2XnqWt9wI2OUD@clusterbytte.qhcax.mongodb.net/?retryWrites=true&w=majority&appName=ClusterBytte",
  );

  // Actualiza todos los access que aún no tienen usuario asociado
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
