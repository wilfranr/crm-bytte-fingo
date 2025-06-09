import { Routes } from "@angular/router";
import { ReporteInformacionComponent } from "./reporte-informacion";

export default [
  { path: "reporte-informacion", data: { breadcrumb: "Reporte de Información" }, component: ReporteInformacionComponent },
  { path: "**", redirectTo: "/notfound" }
] as Routes; 