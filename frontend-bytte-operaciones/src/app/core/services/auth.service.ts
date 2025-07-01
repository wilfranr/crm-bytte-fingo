import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, map } from 'rxjs';

export interface UserInfo {
  id: string;
  name: string;
  email: string;
  role: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = '/api/auth';

  constructor(private http: HttpClient) {}

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

  logout(): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/logout`, {}, { withCredentials: true })
      .pipe(tap(() => localStorage.removeItem('user')));
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

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
