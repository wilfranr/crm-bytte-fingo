import { Routes } from "@angular/router";
import { ReporteInformacionComponent } from "./reporte-informacion";

/**
 * @description Rutas específicas para la sección de Davivienda.
 * Incluye la ruta para el reporte de información.
 */
export default [
  { path: "reporte-informacion", data: { breadcrumb: "Reporte de Información" }, component: ReporteInformacionComponent },
  { path: "**", redirectTo: "/notfound" }
] as Routes; 