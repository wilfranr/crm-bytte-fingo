import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacturacionService {

  private apiUrl = 'http://localhost:3000/api/facturacion'; // URL del backend

  constructor(private http: HttpClient) { }

  procesarArchivo(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}` // Asumiendo que el token se guarda en localStorage
    });

    return this.http.post(`${this.apiUrl}/procesar`, formData, { headers: headers, responseType: 'blob' });
  }
}