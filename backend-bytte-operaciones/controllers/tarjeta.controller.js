
import Tarjeta from '../models/tarjeta.model.js';
import Cliente from '../models/cliente.model.js'; // Necesario para validar el clientId

export const addTarjeta = async (req, res) => {
  try {
    const { clientId, deliveryDate, cardNumber } = req.body;

    // Validar que el clientId exista
    const clienteExistente = await Cliente.findById(clientId);
    if (!clienteExistente) {
      return res.status(404).json({ message: 'Cliente no encontrado.' });
    }

    const nuevaTarjeta = new Tarjeta({
      clientId,
      deliveryDate,
      cardNumber,
    });

    await nuevaTarjeta.save();
    res.status(201).json(nuevaTarjeta);
  } catch (error) {
    console.error('Error al agregar tarjeta:', error);
    res.status(500).json({ message: 'Error interno del servidor al agregar tarjeta.' });
  }
};

export const getTarjetasByCliente = async (req, res) => {
  try {
    const { clientId } = req.params;

    // Validar que el clientId exista
    const clienteExistente = await Cliente.findById(clientId);
    if (!clienteExistente) {
      return res.status(404).json({ message: 'Cliente no encontrado.' });
    }

    const tarjetas = await Tarjeta.find({ clientId }).populate('clientId');
    res.status(200).json(tarjetas);
  } catch (error) {
    console.error('Error al obtener tarjetas del cliente:', error);
    res.status(500).json({ message: 'Error interno del servidor al obtener tarjetas.' });
  }
};

export const getTotalTarjetasCount = async (req, res) => {
  try {
    const count = await Tarjeta.countDocuments();
    console.log('Total Tarjetas Count from DB:', count);
    res.status(200).json({ count });
  } catch (error) {
    console.error('Error al obtener el conteo total de tarjetas:', error);
    res.status(500).json({ message: 'Error interno del servidor al obtener el conteo total de tarjetas.' });
  }
};
