
import mongoose from 'mongoose';

const tarjetaSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
    required: true,
  },
  deliveryDate: {
    type: Date,
    required: true,
  },
  cardNumber: {
    type: String,
    required: false, // Opcional, si se quiere registrar el número de tarjeta
  },
}, {
  timestamps: true,
});

const Tarjeta = mongoose.model('Tarjeta', tarjetaSchema);

export default Tarjeta;
