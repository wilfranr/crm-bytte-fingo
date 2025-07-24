import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Departamento {
  departamento: string;
  ciudades: string[];
}

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private apiUrl = 'http://localhost:3000/api/locations/colombia';

  constructor(private http: HttpClient) { }

  getLocations(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(this.apiUrl);
  }
}
