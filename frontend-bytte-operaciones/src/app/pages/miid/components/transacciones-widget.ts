import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TagModule } from 'primeng/tag';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';

interface Transaccion {
  lp_creation_date: string;
  per_id: string;
  lp_status_process: number;
  per_document_number?: string;
  per_first_name?: string;
  per_last_name?: string;
  ec_id?: number | string;
  ec_name?: string;
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
    TagModule,
    FormsModule,
    DropdownModule,
    InputTextModule
  ],
  template: `
    <div class="card !mb-8">
      <div class="font-semibold text-xl mb-4">Transacciones del Día</div>
      <p-table [value]="filteredTransacciones" [paginator]="true" [rows]="8" responsiveLayout="scroll">
        <ng-template pTemplate="caption">
          <div class="flex justify-content-between align-items-center">
            <div class="text-sm text-gray-400">Filtrar resultados</div>
            <div class="flex align-items-center gap-2">
              <span class="text-sm mr-2">Aliado:</span>
              <p-dropdown 
                [options]="aliadosOptions"
                [(ngModel)]="selectedAliado"
                placeholder="Todos"
                [showClear]="true"
                optionLabel="label"
                optionValue="value">
              </p-dropdown>
            </div>
          </div>
        </ng-template>
        <ng-template pTemplate="header">
          <tr>
            <th pSortableColumn="lp_creation_date">Fecha y Hora <p-sortIcon field="lp_creation_date"></p-sortIcon></th>
            <th pSortableColumn="per_document_number">
              Documento <p-sortIcon field="per_document_number"></p-sortIcon>
              <div class="mt-2">
                <input 
                  pInputText 
                  type="text" 
                  [(ngModel)]="documentoQuery" 
                  placeholder="Buscar documento" 
                  class="p-inputtext-sm w-full" />
              </div>
            </th>
            <th pSortableColumn="ec_name">Aliado <p-sortIcon field="ec_name"></p-sortIcon></th>
            <th pSortableColumn="lp_status_process">Estado <p-sortIcon field="lp_status_process"></p-sortIcon></th>
            <th>Acciones</th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-transaccion>
          <tr>
            <td style="width: 30%; min-width: 10rem;">
              <div class="font-medium">
                {{ transaccion.lp_creation_date | date:'dd/MM/yyyy' }}
              </div>
              <div class="text-sm text-gray-500">
                {{ transaccion.lp_creation_date | date:'HH:mm:ss' }}
              </div>
            </td>
            <td style="width: 25%; min-width: 8rem;">{{ transaccion.per_document_number || '-' }}</td>
            <td style="width: 25%; min-width: 8rem;">{{ transaccion.ec_name || '-' }}</td>
            <td style="width: 15%; min-width: 6rem;">
              <p-tag 
                [value]="getStatusText(transaccion.lp_status_process)"
                [severity]="transaccion.lp_status_process === 1 ? 'success' : 'danger'">
              </p-tag>
            </td>
            <td style="width: 5%;">
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
export class TransaccionesWidget implements OnChanges {
  @Input() transacciones: Transaccion[] = [];

  selectedAliado: string | null = null;
  aliadosOptions: { label: string; value: string }[] = [];
  documentoQuery: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['transacciones']) {
      this.aliadosOptions = this.buildAliadosOptions(this.transacciones);
    }
  }

  get filteredTransacciones(): Transaccion[] {
    let data = this.transacciones;

    if (this.selectedAliado) {
      data = data.filter(t => (t.ec_name || '') === this.selectedAliado);
    }

    const query = (this.documentoQuery || '').trim();
    if (query.length > 0) {
      const q = query.toLowerCase();
      data = data.filter(t => (t.per_document_number || '').toLowerCase().includes(q));
    }

    return data;
  }

  private buildAliadosOptions(transacciones: Transaccion[]): { label: string; value: string }[] {
    const names = Array.from(
      new Set(
        (transacciones || [])
          .map(t => t.ec_name)
          .filter((n): n is string => !!n && n.trim().length > 0)
      )
    ).sort((a, b) => a.localeCompare(b));
    return names.map(n => ({ label: n, value: n }));
  }

  /**
   * @description Carga las transacciones del día desde el backend.
   */
  // Los datos se reciben desde el componente padre vía @Input()

  /**
   * @description Obtiene el texto descriptivo del estado de la transacción.
   * @param status Estado de la transacción (0 o 1).
   * @returns Texto descriptivo del estado.
   */
  getStatusText(status: number): string {
    return status === 1 ? 'Exitoso' : 'Fallido';
  }
}
