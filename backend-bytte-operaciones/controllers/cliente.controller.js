import dotenv from "dotenv";
import { getFreshdeskAuthHeader } from "./utils/freshdeskAuth.js";
import Cliente from "../models/cliente.model.js"; // Importar el modelo de Cliente
import { getDepartments } from "../utils/locations.js";

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
        let cliente = await Cliente.findOne({ id_freshdesk: contacto.id });

        if (cliente) {
          // Si el cliente existe, actualiza solo los campos de Freshdesk
          cliente.name = contacto.name;
          cliente.email = contacto.email;
          cliente.mobile = contacto.mobile;
          cliente.direccion = contacto.address;
          cliente.company_id = contacto.company_id;
          cliente.companyName = contacto.company?.name;
          cliente.custom_fields = contacto.custom_fields;
          await cliente.save();
        } else {
          // Si el cliente no existe, crea uno nuevo
          cliente = new Cliente({
            id_freshdesk: contacto.id,
            name: contacto.name,
            email: contacto.email,
            mobile: contacto.mobile,
            direccion: contacto.address,
            company_id: contacto.company_id,
            companyName: contacto.company?.name,
            custom_fields: contacto.custom_fields,
          });
          await cliente.save();
        }
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
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el cliente" });
  }
};

export const updateCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const { pais, departamento, ciudad, ...otherData } = req.body;

    const updateData = { ...otherData };

    if (pais) {
      updateData.pais = pais;
    }
    if (departamento) {
      const departments = getDepartments();
      const foundDepartment = departments.find(dep => dep.id === departamento);
      if (foundDepartment) {
        updateData.departamento = foundDepartment.departamento;
      } else {
        // Si no se encuentra el departamento, se podría manejar el error o dejarlo como está
        updateData.departamento = departamento; // O asignar null, o el valor original
      }
    }
    if (ciudad) {
      updateData.ciudad = ciudad;
    }

    const cliente = await Cliente.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!cliente) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    res.json(cliente);
  } catch (error) {
    console.error("Error updating client:", error);
    res.status(500).json({ message: "Error al actualizar el cliente" });
  }
};
