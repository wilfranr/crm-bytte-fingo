import xlsx from 'xlsx';
import * as path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROCESSED_DIR = path.join(__dirname, '../processed');
const CONSOLIDADO_MIID_PATH = path.join(PROCESSED_DIR, 'Consolidado_miid.xlsx');

// Asegurarse de que el directorio 'processed' exista
if (!fs.existsSync(PROCESSED_DIR)) {
    fs.mkdirSync(PROCESSED_DIR, { recursive: true });
}

// Función para obtener el nombre del mes en español
const getSpanishMonthName = (date) => {
    const monthNames = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    return monthNames[date.getMonth()];
};

export const procesarArchivo = (req, res) => {
    if (!req.file) {
        return res.status(400).send({ message: 'No se ha subido ningún archivo.' });
    }

    const currentDate = new Date();
    const previousMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);

    try {
        // --- 1. Cargar el archivo de transacciones subido ---
        const transaccionesWb = xlsx.readFile(req.file.path, { cellDates: true });
        const transaccionesSheetName = 'RptDetalleTransacciones';
        if (!transaccionesWb.SheetNames.includes(transaccionesSheetName)) {
            throw new Error(`La hoja "${transaccionesSheetName}" no se encontró en el archivo subido.`);
        }
        const transaccionesSheet = transaccionesWb.Sheets[transaccionesSheetName];
        const transaccionesData = xlsx.utils.sheet_to_json(transaccionesSheet, { header: 1, range: 7 });
        const headers = transaccionesData[0];
        const jsonData = transaccionesData.slice(1).map(row => {
            let obj = {};
            headers.forEach((header, index) => {
                obj[header] = row[index];
            });
            return obj;
        });

        // --- 2. Cargar o crear el archivo consolidado ---
        let consolidadoWb;
        let baseData = [];
        if (fs.existsSync(CONSOLIDADO_MIID_PATH)) {
            consolidadoWb = xlsx.readFile(CONSOLIDADO_MIID_PATH);
            if (consolidadoWb.SheetNames.includes('Base')) {
                const baseSheet = consolidadoWb.Sheets['Base'];
                baseData = xlsx.utils.sheet_to_json(baseSheet);
            }
        } else {
            consolidadoWb = xlsx.utils.book_new();
        }
        
        const documentosEnBase = new Set(baseData.map(row => String(row.DOCUMENTO)));

        // --- 3. Procesar "Enrolados Facturables" (Exitosas) ---
        const exitosas = jsonData.filter(row => row.ESTADO === 'Exitosa');
        const nuevosDocumentos = [];
        const documentosExitososUnicos = new Set();

        exitosas.forEach(row => {
            const doc = String(row.DOCUMENTO);
            if (!documentosEnBase.has(doc) && !documentosExitososUnicos.has(doc)) {
                nuevosDocumentos.push({ DOCUMENTO: doc, MES: getSpanishMonthName(previousMonthDate) + ' ' + previousMonthDate.getFullYear() });
                documentosExitososUnicos.add(doc);
            }
        });

        const totalEnrolados = nuevosDocumentos.length;

        // --- 4. Procesar "No Enrolados Facturables" (Fallidas) ---
        const fallidas = jsonData.filter(row => row.ESTADO === 'Fallida');
        const conteoFallidas = {};

        fallidas.forEach(row => {
            const doc = String(row.DOCUMENTO);
            if (!documentosEnBase.has(doc) && !documentosExitososUnicos.has(doc)) {
                conteoFallidas[doc] = (conteoFallidas[doc] || 0) + 1;
            }
        });

        let totalNoEnrolados = 0;
        for (const doc in conteoFallidas) {
            totalNoEnrolados += Math.floor((conteoFallidas[doc] + 4) / 5);
        }

        // --- 5. Actualizar y guardar el archivo consolidado ---
        // Añadir nuevos documentos a la data de la hoja "Base"
        const updatedBaseData = [...baseData, ...nuevosDocumentos];
        const newBaseSheet = xlsx.utils.json_to_sheet(updatedBaseData);
        consolidadoWb.Sheets['Base'] = newBaseSheet;
        if (!consolidadoWb.SheetNames.includes('Base')) {
            xlsx.utils.book_append_sheet(consolidadoWb, newBaseSheet, 'Base');
        }

        // Guardar los totales en la hoja del mes
        const monthSheetName = getSpanishMonthName(previousMonthDate) + ' ' + previousMonthDate.getFullYear();
        let monthSheet;
        if (consolidadoWb.SheetNames.includes(monthSheetName)) {
            monthSheet = consolidadoWb.Sheets[monthSheetName];
        } else {
            monthSheet = xlsx.utils.aoa_to_sheet([["Enrolados Facturables"], ["No Enrolados Facturables"]]);
            xlsx.utils.book_append_sheet(consolidadoWb, monthSheet, monthSheetName);
        }
        
        xlsx.utils.sheet_add_aoa(monthSheet, [[totalEnrolados]], { origin: 'B1' });
        xlsx.utils.sheet_add_aoa(monthSheet, [[totalNoEnrolados]], { origin: 'B2' });

        xlsx.writeFile(consolidadoWb, CONSOLIDADO_MIID_PATH);

        res.status(200).send({
            message: 'Archivo procesado con éxito.',
            enrolados: totalEnrolados,
            noEnrolados: totalNoEnrolados
        });

    } catch (error) {
        console.error("Error en el procesamiento:", error);
        res.status(500).send({ message: 'Error al procesar el archivo.', error: error.message });
    } finally {
        // Limpiar el archivo subido después de procesarlo
        if (req.file && req.file.path) {
            fs.unlinkSync(req.file.path);
        }
    }
};
