import { Routes } from '@angular/router';
import { LogsComponent } from './logs';

export default [
  { path: 'logs', data: { breadcrumb: 'Logs' }, component: LogsComponent },
  { path: '**', redirectTo: '/notfound' }
] as Routes;