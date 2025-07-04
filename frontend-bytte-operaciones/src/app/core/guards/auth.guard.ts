import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * @description Guarda de ruta para proteger rutas que requieren autenticación.
 * Redirige al usuario a la página de login si no está autenticado.
 */
@Injectable({
  providedIn: 'root',
})
export class authGuard implements CanActivate {
  /**
   * @description Constructor del guarda de autenticación.
   * @param authService Servicio de autenticación para verificar el estado de login.
   * @param router Servicio de enrutamiento para la navegación.
   */
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  /**
   * @description Determina si una ruta puede ser activada.
   * @returns `true` si el usuario está logueado, `false` y redirige al login en caso contrario.
   */
  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['/auth/login']);
    return false;
  }
}
