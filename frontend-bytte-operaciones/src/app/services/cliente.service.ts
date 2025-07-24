import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClienteResponse } from '../core/models/cliente-response.model';
import { Cliente } from '../core/models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl = 'http://localhost:3000/api/clientes';

  constructor(private http: HttpClient) { }

  getClientes(): Observable<ClienteResponse> {
    return this.http.get<ClienteResponse>(this.apiUrl);
  }

  getClienteById(id: string): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/${id}`);
  }

  updateCliente(id: string, cliente: Partial<Cliente>): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiUrl}/${id}`, cliente);
  }
}