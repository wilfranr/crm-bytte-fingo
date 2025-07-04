import { Routes } from '@angular/router';
import { Access } from './access';
import { LoginComponent } from './login/login';
import { Error } from './error';
import { RegisterComponent } from './register/register.component';

/**
 * @description Rutas para la sección de autenticación de la aplicación.
 * Incluye rutas para acceso denegado, login, registro y errores.
 */
export default [
  { path: 'access', component: Access },
  { path: 'error', component: Error },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
] as Routes;
