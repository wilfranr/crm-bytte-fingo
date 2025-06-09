const ExcelJS = require("exceljs");
const fs = require("fs-extra");
const path = require("path");

exports.processExcel = async (req, res) => {
  try {
    console.log("Archivo recibido:", req.file);

    if (!req.file) {
      throw new Error("No se recibió ningún archivo.");
    }

    const filePath = req.file.path;
    console.log("Ruta del archivo:", filePath);

    // Crear un nuevo libro de trabajo con ExcelJS
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);

    const worksheet = workbook.getWorksheet("RptCuentaDigital");
    if (!worksheet) {
      throw new Error(
        `La hoja "RptCuentaDigital" no se encontró en el archivo.`
      );
    }

    console.log("Hoja cargada correctamente.");

    // Leer la fecha desde la celda C3
    const fechaC3 = worksheet.getCell("C3").value;
    console.log("Fecha en C3:", fechaC3);

    const fechaFormateada = new Date(fechaC3).toISOString().split("T")[0];

    // Filtrar las filas basadas en "ESTADO PROCESO"
    const estadoProcesoIndex = worksheet
      .getRow(2)
      .values.findIndex((value) => value === "ESTADO PROCESO");
    const noDocumentoIndex = worksheet
      .getRow(2)
      .values.findIndex((value) => value === "NO DOCUMENTO");

    if (estadoProcesoIndex === -1 || noDocumentoIndex === -1) {
      throw new Error(
        "No se encontraron las columnas necesarias en el archivo."
      );
    }

    const filteredRows = [];
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber > 2) {
        const estadoProceso = row.getCell(estadoProcesoIndex).value;
        if (estadoProceso === "NO EXITOSA") {
          filteredRows.push(row.getCell(noDocumentoIndex).value);
        }
      }
    });

    // Contar los documentos y sumar las transacciones
    const documentCounts = filteredRows.reduce((counts, noDocumento) => {
      counts[noDocumento] = (counts[noDocumento] || 0) + 1;
      return counts;
    }, {});

    const totalTransacciones = Object.values(documentCounts).reduce(
      (acc, value) => acc + value,
      0
    );

    // Crear nueva hoja con los resultados
    const newWorksheet = workbook.addWorksheet("App Empresas");

    // Encabezados
    newWorksheet.columns = [
      { header: "Clientes", key: "clientes", width: 30 },
      { header: "Transacciones", key: "transacciones", width: 15 },
    ];

    // Agregar datos
    Object.entries(documentCounts).forEach(([cliente, transacciones]) => {
      newWorksheet.addRow({ clientes: cliente, transacciones });
    });
    newWorksheet.addRow({
      clientes: "Total",
      transacciones: totalTransacciones,
    });

    // Estilizar las celdas específicas del encabezado
    const headerRow = newWorksheet.getRow(1);
    headerRow.getCell(1).font = { bold: true, color: { argb: "FFFFFF" } };
    headerRow.getCell(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "1D4ED8" },
    };
    headerRow.getCell(2).font = { bold: true, color: { argb: "FFFFFF" } };
    headerRow.getCell(2).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "1D4ED8" },
    };

    newWorksheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
        cell.alignment = { vertical: "middle", horizontal: "center" };
      });
    });

    // Eliminar hoja original
    workbook.removeWorksheet(worksheet.id);

    // Formatear la fecha de ayer para el nombre del archivo
    const ayer = new Date();
    ayer.setDate(ayer.getDate() - 1);
    const dia = String(ayer.getDate()).padStart(2, "0");
    const mes = String(ayer.getMonth() + 1).padStart(2, "0");
    const anio = ayer.getFullYear();
    const fechaAyer = `${dia}-${mes}-${anio}`;

    const newFileName = `Reporte de Información ${fechaAyer}.xlsx`;
    const newFilePath = path.join("processed", newFileName);

    console.log("Ruta del archivo procesado:", newFilePath);

    // Crear la carpeta 'processed' si no existe
    fs.ensureDirSync("processed");
    await workbook.xlsx.writeFile(newFilePath);

    fs.unlinkSync(filePath);
    console.log("Nombre del archivo que se enviará:", newFileName);

    // Enviar el archivo al cliente
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${newFileName}"`
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.sendFile(path.resolve(newFilePath), (err) => {
      if (err) {
        console.error("Error al enviar el archivo:", err);
      } else {
        fs.unlinkSync(newFilePath);
      }
    });
  } catch (error) {
    console.error("Error en el procesamiento:", error);
    if (!res.headersSent) {
      res.status(500).json({ error: error.message });
    }
  }
};
