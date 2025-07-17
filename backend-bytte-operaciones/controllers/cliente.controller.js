import dotenv from "dotenv";
import { getFreshdeskAuthHeader } from "./utils/freshdeskAuth.js";

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
    res.json(data);
  } catch (error) {
    console.error("Error fetching clients from Freshdesk:", error);
    res.status(500).json({ message: "Error fetching clients from Freshdesk" });
  }
};
