import fs from 'fs';
import xlsx from 'xlsx';

// Mock de las dependencias
jest.mock('fs');
jest.mock('xlsx');

// Mock del módulo facturacion.controller.js para controlar __filename y __dirname
jest.mock('../controllers/facturacion.controller.js', () => {
  const path = jest.requireActual('path');
  const url = jest.requireActual('url');

  const MOCKED_FILENAME = '/mock/backend-bytte-operaciones/controllers/facturacion.controller.js';
  const MOCKED_DIRNAME = '/mock/backend-bytte-operaciones/controllers';
  const MOCKED_PROCESSED_DIR = path.join(MOCKED_DIRNAME, "../processed");
  const MOCKED_CONSOLIDADO_MIID_PATH = path.join(MOCKED_PROCESSED_DIR, "Consolidado_miid.xlsx");

  return {
    __esModule: true,
    procesarArchivo: jest.fn((req, res) => {
      // Aquí va la implementación simulada de procesarArchivo
      // Puedes copiar la lógica original y adaptarla para usar los mocks
      // o simplemente simular el comportamiento de alto nivel.

      if (!req.file) {
        return res.status(400).send({ message: "No se ha subido ningún archivo." });
      }

      // Simular fs.existsSync
      if (!fs.existsSync(MOCKED_PROCESSED_DIR)) {
        fs.mkdirSync(MOCKED_PROCESSED_DIR, { recursive: true });
      }

      try {
        // Simular xlsx.readFile
        const transaccionesWb = xlsx.readFile(req.file.path, { cellDates: true });
        const transaccionesSheetName = "RptDetalleTransacciones";
        if (!transaccionesWb.SheetNames.includes(transaccionesSheetName)) {
          throw new Error(
            `La hoja "${transaccionesSheetName}" no se encontró en el archivo subido.`,
          );
        }

        // Simular xlsx.writeFile
        xlsx.writeFile(null, MOCKED_CONSOLIDADO_MIID_PATH);

        res.download(MOCKED_CONSOLIDADO_MIID_PATH, "Consolidado_miid.xlsx", (err) => {
          if (err) {
            res.status(500).send({ message: "Error al descargar el archivo consolidado.", error: err.message });
          } else {
            if (req.file && req.file.path) {
              fs.unlinkSync(req.file.path);
            }
          }
        });
      } catch (error) {
        res.status(500).send({ message: "Error al procesar el archivo.", error: error.message });
        if (req.file && req.file.path) {
          fs.unlinkSync(req.file.path);
        }
      }
    }),
    // Exportar las variables mockeadas para que el controlador las use
    __filename: MOCKED_FILENAME,
    __dirname: MOCKED_DIRNAME,
    PROCESSED_DIR: MOCKED_PROCESSED_DIR,
    CONSOLIDADO_MIID_PATH: MOCKED_CONSOLIDADO_MIID_PATH,
    // Mockear las funciones internas que dependen de estas variables
    getSpanishMonthName: jest.fn((date) => {
      const monthNames = [
        "enero", "febrero", "marzo", "abril", "mayo", "junio",
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
      ];
      return monthNames[date.getMonth()];
    }),
  };
});

// Importar la función procesarArchivo después de mockear el módulo
import { procesarArchivo } from '../controllers/facturacion.controller.js';

// Mock de req y res
const mockRequest = (file) => ({
  file,
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  res.download = jest.fn((path, filename, callback) => {
    if (callback) callback(); // Simula la finalización de la descarga
  });
  res.headersSent = false;
  return res;
};

describe('Facturacion Controller - procesarArchivo', () => {

  beforeEach(() => {
    jest.clearAllMocks();
    // Simulación base para fs.existsSync
    fs.existsSync.mockReturnValue(false);
    // Resetear el mock de procesarArchivo para cada test
    procesarArchivo.mockRestore(); // Restaura la implementación original del mock
  });

  it('debe devolver 400 si no se proporciona un archivo', async () => {
    const req = mockRequest(null);
    const res = mockResponse();

    // Importar la implementación real de procesarArchivo para este test
    const { procesarArchivo: originalProcesarArchivo } = jest.requireActual('../controllers/facturacion.controller.js');
    await originalProcesarArchivo(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({ message: 'No se ha subido ningún archivo.' });
  });

  it('debe devolver 500 si al archivo le falta la hoja requerida', async () => {
    const req = mockRequest({ path: 'fake/path.xlsx' });
    const res = mockResponse();

    xlsx.readFile.mockReturnValue({ SheetNames: ['OtraHoja'] });

    const { procesarArchivo: originalProcesarArchivo } = jest.requireActual('../controllers/facturacion.controller.js');
    await originalProcesarArchivo(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith(expect.objectContaining({
      message: 'Error al procesar el archivo.',
      error: 'La hoja "RptDetalleTransacciones" no se encontró en el archivo subido.'
    }));
    expect(fs.unlinkSync).toHaveBeenCalledWith('fake/path.xlsx');
  });

  it('debe procesar el archivo correctamente y devolverlo para descargar', async () => {
    const req = mockRequest({ path: 'fake/upload.xlsx' });
    const res = mockResponse();

    // Simular archivo subido
    const mockTransactionData = [
      ['DOCUMENTO', 'ESTADO'],
      ['111', 'Exitosa'], // Nuevo, debe ser contado
      ['222', 'Fallida'], // Nuevo, debe ser contado
      ['333', 'Exitosa'], // Ya existe, no debe ser contado
    ];
    xlsx.readFile.mockImplementation((filePath) => {
      if (filePath.includes('upload')) {
        return {
          SheetNames: ['RptDetalleTransacciones'],
          Sheets: {
            'RptDetalleTransacciones': xlsx.utils.aoa_to_sheet(mockTransactionData)
          }
        };
      }
      // Simular archivo consolidado existente
      if (filePath.includes('Consolidado_miid')) {
        return {
          SheetNames: ['Base'],
          Sheets: {
            'Base': xlsx.utils.json_to_sheet([{ DOCUMENTO: '333' }])
          }
        };
      }
      return {};
    });
    xlsx.utils.sheet_to_json.mockImplementation((sheet) => {
        if(sheet && sheet["!data"] && sheet["!data"][0] && sheet["!data"][0][0] && sheet["!data"][0][0].v === "DOCUMENTO") { // Es la hoja de transacciones
            return [{ DOCUMENTO: '111', ESTADO: 'Exitosa' }, { DOCUMENTO: '222', ESTADO: 'Fallida' }, { DOCUMENTO: '333', ESTADO: 'Exitosa' }];
        } else { // Es la hoja base
            return [{ DOCUMENTO: '333' }];
        }
    });
    fs.existsSync.mockReturnValue(true); // Simula que el consolidado existe

    const { procesarArchivo: originalProcesarArchivo } = jest.requireActual('../controllers/facturacion.controller.js');
    await originalProcesarArchivo(req, res);

    // Verificar que se escribió el archivo con los datos correctos
    expect(xlsx.writeFile).toHaveBeenCalled();
    // Verificar que se inició la descarga
    expect(res.download).toHaveBeenCalledWith(expect.stringContaining('Consolidado_miid.xlsx'), 'Consolidado_miid.xlsx', expect.any(Function));
    // Verificar que el archivo subido se eliminó después de la descarga
    expect(fs.unlinkSync).toHaveBeenCalledWith('fake/upload.xlsx');
  });

  it('debe devolver 500 si ocurre un error inesperado', async () => {
    const req = mockRequest({ path: 'fake/path.xlsx' });
    const res = mockResponse();
    const errorMessage = 'Error inesperado de lectura';

    xlsx.readFile.mockImplementation(() => {
      throw new Error(errorMessage);
    });

    const { procesarArchivo: originalProcesarArchivo } = jest.requireActual('../controllers/facturacion.controller.js');
    await originalProcesarArchivo(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith(expect.objectContaining({
      message: 'Error al procesar el archivo.',
      error: errorMessage
    }));
    expect(fs.unlinkSync).toHaveBeenCalledWith('fake/path.xlsx');
  });
});