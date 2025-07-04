import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

/**
 * @description Interceptor HTTP para manejar la autenticación y el refresco de tokens.
 * Añade credenciales a las peticiones y maneja errores 401 para refrescar el token de acceso.
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  /**
   * @description Indica si se está realizando una operación de refresco de token.
   */
  private isRefreshing = false;
  /**
   * @description Sujeto para manejar las peticiones pendientes mientras se refresca el token.
   */
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null,
  );

  /**
   * @description Constructor del interceptor.
   * @param authService Servicio de autenticación para manejar el refresco y cierre de sesión.
   */
  constructor(private authService: AuthService) {}

  /**
   * @description Intercepta las peticiones HTTP salientes.
   * Añade `withCredentials: true` a todas las peticiones y maneja los errores 401.
   * @param req La petición HTTP saliente.
   * @param next El siguiente manejador en la cadena de interceptores.
   * @returns Un Observable de HttpEvent.
   */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const clonedReq = req.clone({ withCredentials: true });

    return next.handle(clonedReq).pipe(
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse &&
          error.status === 401 &&
          !req.url.includes('/auth/refresh')
        ) {
          return this.handle401Error(clonedReq, next);
        }
        return throwError(() => error);
      }),
    );
  }

  /**
   * @description Maneja los errores 401 (No autorizado).
   * Intenta refrescar el token de acceso y reintenta la petición original.
   * Si el refresco falla, cierra la sesión del usuario.
   * @param request La petición HTTP original que resultó en un 401.
   * @param next El siguiente manejador en la cadena de interceptores.
   * @returns Un Observable de HttpEvent.
   */
  private handle401Error(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap(() => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(true);
          return next.handle(request.clone({ withCredentials: true }));
        }),
        catchError((err) => {
          this.isRefreshing = false;
          this.authService.handleLogout();
          return throwError(() => err);
        }),
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter((token) => token !== null),
        take(1),
        switchMap(() => next.handle(request.clone({ withCredentials: true }))),
      );
    }
  }
}