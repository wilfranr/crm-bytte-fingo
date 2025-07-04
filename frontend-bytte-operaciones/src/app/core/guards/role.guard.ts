import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * @description Guarda de ruta funcional para proteger rutas basadas en el rol del usuario.
 * Permite el acceso solo si el usuario tiene uno de los roles esperados definidos en los datos de la ruta.
 * Redirige a la raíz si el usuario no tiene el rol requerido.
 * @param route La instantánea de la ruta activada, que contiene los datos de la ruta.
 * @param state El estado del router en el momento de la activación.
 * @returns `true` si el usuario tiene el rol requerido, `false` en caso contrario.
 */
export const roleGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const userInfo = authService.getUserInfo();
  const expectedRoles = route.data['roles'] as string[];

  if (userInfo && expectedRoles.includes(userInfo.role)) {
    return true;
  }

  router.navigate(['/']);
  return false;
};
