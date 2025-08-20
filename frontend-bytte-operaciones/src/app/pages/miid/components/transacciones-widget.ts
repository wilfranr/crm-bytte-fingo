import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TagModule } from 'primeng/tag';

interface Transaccion {
  lp_creation_date: string;
  per_id: string;
  lp_status_process: number;
}

/**
 * @description Widget que muestra las transacciones del día en una tabla paginada.
 * Se integra con el dashboard de MIID para mostrar datos en tiempo real.
 */
@Component({
  selector: 'app-transacciones-widget',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    RippleModule,
    TagModule
  ],
  template: `
    <div class="card !mb-8">
      <div class="font-semibold text-xl mb-4">Transacciones del Día</div>
      <p-table [value]="transacciones" [paginator]="true" [rows]="8" responsiveLayout="scroll">
        <ng-template pTemplate="header">
          <tr>
            <th>Fecha y Hora</th>
            <th pSortableColumn="per_id">ID Cliente <p-sortIcon field="per_id"></p-sortIcon></th>
            <th pSortableColumn="lp_status_process">Estado <p-sortIcon field="lp_status_process"></p-sortIcon></th>
            <th>Acciones</th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-transaccion>
          <tr>
            <td style="width: 35%; min-width: 10rem;">
              <div class="font-medium">
                {{ transaccion.lp_creation_date | date:'dd/MM/yyyy' }}
              </div>
              <div class="text-sm text-gray-500">
                {{ transaccion.lp_creation_date | date:'HH:mm:ss' }}
              </div>
            </td>
            <td style="width: 35%; min-width: 8rem;">{{ transaccion.per_id }}</td>
            <td style="width: 20%; min-width: 6rem;">
              <p-tag 
                [value]="getStatusText(transaccion.lp_status_process)"
                [severity]="transaccion.lp_status_process === 1 ? 'success' : 'danger'">
              </p-tag>
            </td>
            <td style="width: 10%;">
              <button 
                pButton 
                pRipple 
                type="button" 
                icon="pi pi-search" 
                class="p-button p-component p-button-text p-button-icon-only">
              </button>
            </td>
          </tr>
        </ng-template>
      </p-table>
    </div>
  `
})
export class TransaccionesWidget implements OnInit {
  transacciones: Transaccion[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargarTransacciones();
  }

  /**
   * @description Carga las transacciones del día desde el backend.
   */
  cargarTransacciones() {
    this.http.get<any>('/api/dashboard').subscribe({
      next: (data) => {
        if (data.transaccionesDetalle && data.transaccionesDetalle.length > 0) {
          this.transacciones = data.transaccionesDetalle;
        } else {
          this.transacciones = [];
        }
      },
      error: (error) => {
        console.error('Error al cargar transacciones:', error);
        this.transacciones = [];
      }
    });
  }

  /**
   * @description Obtiene el texto descriptivo del estado de la transacción.
   * @param status Estado de la transacción (0 o 1).
   * @returns Texto descriptivo del estado.
   */
  getStatusText(status: number): string {
    return status === 1 ? 'Exitoso' : 'Fallido';
  }
}
