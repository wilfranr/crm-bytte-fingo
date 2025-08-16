import express from 'express';
import cors from 'cors';
import { exploreDatabase } from './controllers/dashboard.controller.js';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Endpoint de prueba
app.get('/api/dashboard/explore', exploreDatabase);

app.listen(PORT, () => {
  console.log(`🧪 Servidor de prueba corriendo en el puerto ${PORT}`);
  console.log(`🔍 Endpoint disponible: http://localhost:${PORT}/api/dashboard/explore`);
});
