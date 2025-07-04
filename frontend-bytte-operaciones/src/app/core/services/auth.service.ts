import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, map } from 'rxjs';
import { Router } from '@angular/router';

/**
 * @description Interfaz que define la estructura de la información del usuario.
 */
export interface UserInfo {
  id: string;
  name: string;
  email: string;
  role: string;
}

/**
 * @description Servicio para la gestión de autenticación de usuarios.
 * Proporciona métodos para login, logout y refresco de tokens.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = '/api/auth';
  private router = inject(Router);

  /**
   * @description Constructor del servicio de autenticación.
   * @param http Cliente HTTP para realizar peticiones.
   */
  constructor(private http: HttpClient) {}

  /**
   * @description Realiza la autenticación del usuario enviando las credenciales al backend.
   * Almacena la información del usuario en el localStorage si el login es exitoso.
   * @param email El correo electrónico del usuario.
   * @param password La contraseña del usuario.
   * @returns Un Observable que emite la información del usuario autenticado.
   */
  login(email: string, password: string): Observable<UserInfo> {
    return this.http
      .post<{ user: UserInfo }>(
        `${this.apiUrl}/login`,
        { email, password },
        {
          withCredentials: true,
        },
      )
      .pipe(
        tap((response) => {
          localStorage.setItem('user', JSON.stringify(response.user));
        }),
        map((response) => response.user),
      );
  }

  /**
   * @description Cierra la sesión del usuario, notificando al backend y limpiando el estado local.
   * @returns Un Observable que emite cuando la sesión ha sido cerrada.
   */
  logout(): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/logout`, {}, { withCredentials: true })
      .pipe(tap(() => this.handleLogout()));
  }

  /**
   * @description Solicita un nuevo token de acceso al backend utilizando el token de refresco.
   * @returns Un Observable que emite cuando el token ha sido refrescado.
   */
  refreshToken(): Observable<any> {
    return this.http.post(`${this.apiUrl}/refresh`, {}, { withCredentials: true });
  }

  /**
   * @description Maneja el cierre de sesión del usuario, limpiando el almacenamiento local y redirigiendo al login.
   */
  handleLogout() {
    localStorage.removeItem('user');
    this.router.navigate(['/auth/login']);
  }

  /**
   * @description Verifica si el usuario está actualmente logueado basándose en la presencia de datos en localStorage.
   * @returns `true` si el usuario está logueado, `false` en caso contrario.
   */
  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  /**
   * @description Obtiene la información del usuario logueado desde el almacenamiento local.
   * @returns La información del usuario (`UserInfo`) o `null` si no hay usuario logueado o los datos son inválidos.
   */
  getUserInfo(): UserInfo | null {
    const data = localStorage.getItem('user');
    // Asegura que data no sea null ni el string "undefined"
    if (!data || data === 'undefined') {
      return null;
    }
    try {
      return JSON.parse(data) as UserInfo;
    } catch {
      // Si por alguna razón hay datos corruptos, limpialos para no romper la app
      localStorage.removeItem('user');
      return null;
    }
  }
}
