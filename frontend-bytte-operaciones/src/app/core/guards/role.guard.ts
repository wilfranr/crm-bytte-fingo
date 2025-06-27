import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

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
