import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class InviteService {
  private apiUrl = '/api/invite';

  constructor(private http: HttpClient) {}

  generateToken() {
    return this.http.post<{ token: string }>(`${this.apiUrl}/generate`, {});
  }
}
