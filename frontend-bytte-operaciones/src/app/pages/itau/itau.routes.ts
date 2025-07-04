import { Routes } from '@angular/router';
import { Facturacion } from './facturacion';

/**
 * @description Rutas específicas para la sección de Itaú.
 * Incluye la ruta para la facturación.
 */
export default [
    { path: 'facturacion', data: { breadcrumb: 'Facturación' }, component: Facturacion },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
