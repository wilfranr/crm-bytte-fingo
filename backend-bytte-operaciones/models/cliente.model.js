import mongoose from 'mongoose';

const clienteSchema = new mongoose.Schema({
  id_freshdesk: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
  },
  direccion: {
    type: String,
  },
  ciudad: {
    type: String,
  },
  departamento: {
    type: String,
  },
  pais: {
    type: String,
    default: 'Colombia',
  },
  company_id: {
    type: Number,
  },
  companyName: {
    type: String,
  },
  custom_fields: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
  },
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    // No transformar _id a id, mantener _id
    // No eliminar __v
  },
});

const Cliente = mongoose.model('Cliente', clienteSchema);

export default Cliente;