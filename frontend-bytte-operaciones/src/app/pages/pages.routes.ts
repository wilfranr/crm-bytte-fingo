import { Routes } from '@angular/router';
import { Documentation } from './documentation/documentation';
import { Crud } from './crud/crud';
import { Empty } from './empty/empty';
import { FacturacionCasbComponent } from '../components/facturacion-casb/facturacion-casb.component';
import { ClientesComponent } from './clientes/clientes.component'; // Importar ClientesComponent
import { EditClienteComponent } from '../components/clientes/edit-cliente/edit-cliente.component'; // Importar EditClienteComponent
import { DashboardMiidComponent } from './miid/dashboard-miid'; // Importar DashboardMiidComponent

/**
 * @description Rutas para las páginas generales de la aplicación.
 * Incluye rutas para documentación, CRUD de ejemplo y una página vacía.
 */
export default [
    { path: 'documentation', component: Documentation },
    { path: 'crud', component: Crud },
    { path: 'empty', component: Empty },
    { path: 'facturacion-casb', component: FacturacionCasbComponent },
    { path: 'clientes', component: ClientesComponent }, // Ruta para el listado de clientes
    { path: 'clientes/edit/:id', component: EditClienteComponent }, // Ruta para editar un cliente
    { path: 'miid/dashboard', component: DashboardMiidComponent }, // Ruta para el dashboard MIID
] as Routes;
