import { Routes } from '@angular/router';
import { LogsComponent } from './logs';

/**
 * @description Rutas específicas para la sección de Antel.
 * Incluye la ruta para la revisión de logs.
 */
export default [
  { path: 'logs', data: { breadcrumb: 'Logs' }, component: LogsComponent },
  { path: '**', redirectTo: '/notfound' }
] as Routes;