import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Accesos {
  _id?: string;
  portalName: string;
  url: string;
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AccesosService {
  private apiUrl = '/api/access'; // Ajusta la URL si es necesario

  constructor(private http: HttpClient) {}

  getAll(): Observable<Accesos[]> {
    return this.http.get<Accesos[]>(this.apiUrl);
  }

  create(access: Accesos): Observable<Accesos> {
    return this.http.post<Accesos>(this.apiUrl, access);
  }

  update(id: string, access: Accesos): Observable<Accesos> {
    return this.http.put<Accesos>(`${this.apiUrl}/${id}`, access);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
