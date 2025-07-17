import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Documentation } from './app/pages/documentation/documentation';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';
import { Cortes } from './app/pages/dashboard/cortes';
import { AccesosComponent } from './app/pages/dashboard/accesos';
import { Access } from './app/pages/auth/access';
import { roleGuard } from './app/core/guards/role.guard';
import { authGuard } from './app/core/guards/auth.guard';

export const appRoutes: Routes = [
  {
    path: '',
    component: AppLayout,
    canActivate: [authGuard],
    children: [
      { path: '', component: Cortes },
      { path: 'cortes', component: Cortes },
      {
        path: 'accesos',
        component: AccesosComponent,
      },
      {
        path: 'uikit',
        loadChildren: () => import('./app/pages/uikit/uikit.routes'),
      },
      { path: 'documentation', component: Documentation },
      { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') },
      {
        path: 'itau',
        loadChildren: () => import('./app/pages/itau/itau.routes'),
      },
      {
        path: 'davivienda',
        loadChildren: () => import('./app/pages/davivienda/davivienda.routes'),
      },
      {
        path: 'antel',
        loadChildren: () => import('./app/pages/antel/antel.routes'),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./app/pages/users/users.routes').then((m) => m.usersRoutes),
        canActivate: [authGuard, roleGuard],
        data: { roles: ['admin', 'superadmin'] },
      },
      {
        path: 'facturacion-miid',
        loadComponent: () => import('./app/components/facturacion-miid/facturacion-miid.component').then(m => m.FacturacionMiidComponent),
        canActivate: [authGuard, roleGuard],
        data: { roles: ['admin', 'superadmin'] },
      },
      {
        path: 'clientes',
        loadComponent: () => import('./app/pages/clientes/clientes.component').then(m => m.ClientesComponent),
        canActivate: [authGuard, roleGuard],
        data: { roles: ['admin', 'superadmin'] },
      },
    ],
  },
  { path: 'access', component: Access },
  { path: 'landing', component: Landing },
  { path: 'notfound', component: Notfound },
  { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
  { path: '**', redirectTo: '/notfound' },
];
