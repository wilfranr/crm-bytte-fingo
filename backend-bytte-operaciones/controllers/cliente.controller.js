import dotenv from "dotenv";
import { getFreshdeskAuthHeader } from "./utils/freshdeskAuth.js";
import Cliente from "../models/cliente.model.js"; // Importar el modelo de Cliente

dotenv.config();

export const getClientes = async (req, res) => {
  try {
    const apiKey = process.env.FRESHDESK_API_KEY;

    const response = await fetch(
      'https://byttesas.freshdesk.com/api/v2/search/contacts?query="tag:Fingo"',
      {
        method: "GET",
        headers: {
          Authorization: getFreshdeskAuthHeader(apiKey),
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Procesar y guardar en la base de datos
    if (
      data.results &&
      Array.isArray(data.results) &&
      data.results.length > 0
    ) {
      for (const contacto of data.results) {
        await Cliente.findOneAndUpdate(
          { id_freshdesk: contacto.id },
          {
            name: contacto.name,
            email: contacto.email,
            mobile: contacto.mobile,
            company_id: contacto.company_id,
            companyName: contacto.company?.name, // Guardar el nombre de la empresa
            custom_fields: contacto.custom_fields,
          },
          { upsert: true, new: true, setDefaultsOnInsert: true },
        );
      }
    }

    // Devolver los clientes desde la base de datos local
    const clientesDB = await Cliente.find();
    res.json({ results: clientesDB });
  } catch (error) {
    console.error("Error fetching and syncing clients:", error);
    res.status(500).json({ message: "Error fetching and syncing clients" });
  }
};

export const getClienteById = async (req, res) => {
  try {
    const { id } = req.params;
    const cliente = await Cliente.findById(id);
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el cliente' });
  }
};

export const updateCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = {};
    Object.entries(req.body).forEach(([key, value]) => {
      if (value !== undefined) {
        updateData[key] = value;
      }
    });

    const cliente = await Cliente.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    res.json(cliente);
  } catch (_error) {
    res.status(500).json({ message: 'Error al actualizar el cliente' });
  }
};

