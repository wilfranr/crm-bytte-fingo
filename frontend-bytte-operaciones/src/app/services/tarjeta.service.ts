
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Tarjeta {
  _id?: string;
  clientId: string;
  deliveryDate: string; // Revertido a string
  cardNumber?: string;
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {

  private apiUrl = 'http://localhost:3000/api/tarjetas'; // Asegúrate de que esta URL sea correcta

  constructor(private http: HttpClient) { }

  addTarjeta(tarjeta: Tarjeta): Observable<Tarjeta> {
    return this.http.post<Tarjeta>(this.apiUrl, tarjeta);
  }

  getTarjetasByCliente(clientId: string): Observable<Tarjeta[]> {
    return this.http.get<Tarjeta[]>(`${this.apiUrl}/cliente/${clientId}`);
  }

  getTotalTarjetasCount(): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`${this.apiUrl}/count`);
  }
}
