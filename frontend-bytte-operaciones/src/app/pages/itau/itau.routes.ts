import { Routes } from '@angular/router';
import { Facturacion } from './facturacion';

export default [
    { path: 'facturacion', data: { breadcrumb: 'Facturación' }, component: Facturacion },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
