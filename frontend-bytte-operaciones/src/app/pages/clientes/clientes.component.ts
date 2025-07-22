import { Component, OnInit, ViewChild } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../core/models/cliente.model';
import { CommonModule } from '@angular/common';
import { Table, TableModule } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog'; // Importar DialogModule
import { TarjetaService, Tarjeta } from '../../services/tarjeta.service'; // Importar TarjetaService y Tarjeta
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { CalendarModule } from 'primeng/calendar'; // Importar CalendarModule
import { DividerModule } from 'primeng/divider'; // Importar DividerModule

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ToastModule,
    MessageModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    ButtonModule,
    DialogModule, // Añadir DialogModule
    FormsModule, // Añadir FormsModule
    CalendarModule, // Añadir CalendarModule
    DividerModule, // Añadir DividerModule
  ],
  providers: [MessageService],
  template: `
    <p-toast></p-toast>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
      <div class="col-span-12 lg:col-span-6">
        <div class="card mb-0">
          <div class="flex justify-between mb-4">
            <div>
              <span class="block text-muted-color font-medium mb-4"
                >Clientes</span
              >
              <div
                class="text-surface-900 dark:text-surface-0 font-medium text-xl"
              >
                {{ clientCount }}
              </div>
            </div>
            <div
              class="flex items-center justify-center bg-cyan-100 dark:bg-cyan-400/10 rounded-border"
              style="width: 2.5rem; height: 2.5rem"
            >
              <i class="pi pi-users text-cyan-500 !text-xl"></i>
            </div>
          </div>
          <!--<span class="text-primary font-medium">520 </span> //
          <span class="text-muted-color">newly registered</span> -->
        </div>
      </div>
      <div class="col-span-12 lg:col-span-6">
        <div class="card mb-0">
          <div class="flex justify-between mb-4">
            <div>
              <span class="block text-muted-color font-medium mb-4"
                >Tarjetas Entregadas</span
              >
              <div
                class="text-surface-900 dark:text-surface-0 font-medium text-xl"
              >
                {{ totalTarjetasCount }}
              </div>
            </div>
            <div
              class="flex items-center justify-center bg-purple-100 dark:bg-purple-400/10 rounded-border"
              style="width: 2.5rem; height: 2.5rem"
            >
              <i class="pi pi-credit-card text-purple-500 !text-xl"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-12">
        <div class="card">
          <div
            style="display: flex; justify-content: space-between; align-items: center;"
          >
            <h2>CLIENTES CON TARJETA ACTIVA</h2>
            <img
              src="assets/layout/images/logo_fingo.png"
              alt="Fingo Logo"
              style="height: 40px;"
            />
          </div>
          <p-message severity="info"
            >Doble clic en cualquier campo para copiar al
            portapapeles.</p-message
          >
          <p-table
            #dt
            [value]="clientes"
            [paginator]="true"
            [rows]="10"
            [globalFilterFields]="[
              'name',
              'email',
              'mobile',
              'company.name',
              'custom_fields.id_formulario',
            ]"
          >
            <ng-template pTemplate="caption">
              <div
                class="flex justify-content-between align-items-center flex-column sm:flex-row"
              >
                <button
                  pButton
                  label="Clear"
                  class="p-button-outlined mb-2"
                  icon="pi pi-filter-slash"
                  (click)="clear(dt)"
                ></button>
                <p-iconfield iconPosition="left" class="ml-auto">
                  <p-inputicon>
                    <i class="pi pi-search"></i>
                  </p-inputicon>
                  <input
                    pInputText
                    type="text"
                    (input)="onGlobalFilter(dt, $event)"
                    placeholder="Buscar por palabra clave"
                  />
                </p-iconfield>
              </div>
            </ng-template>
            <ng-template pTemplate="header">
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Empresa</th>
                <th>Id Formulario</th>
                <th>Tarjetas</th> <!-- Nueva columna para tarjetas -->
                <th>Acciones</th> <!-- Nueva columna para acciones -->
              </tr>
            </ng-template>
            <ng-template pTemplate="body" let-cliente>
              <tr>
                <td (dblclick)="copyToClipboard(cliente.name)">
                  {{ cliente.name }}
                </td>
                <td (dblclick)="copyToClipboard(cliente.email)">
                  {{ cliente.email }}
                </td>
                <td (dblclick)="copyToClipboard(cliente.mobile)">
                  {{ cliente.mobile }}
                </td>
                <td (dblclick)="copyToClipboard(cliente.companyName)">
                  {{ cliente.companyName }}
                </td>
                <td
                  (dblclick)="
                    copyToClipboard(cliente.custom_fields.id_formulario)
                  "
                >
                  {{ cliente.custom_fields.id_formulario }}
                </td>
                <td>{{ cliente.tarjetasCount || 0 }}</td> <!-- Mostrar cantidad de tarjetas -->
                <td>
                  <button pButton icon="pi pi-eye" class="p-button-rounded p-button-outlined p-button-info p-button-sm mr-2" (click)="showTarjetas(cliente)"></button>
                  <button pButton icon="pi pi-plus" class="p-button-rounded p-button-outlined p-button-success p-button-sm" (click)="addTarjetaDialog(cliente)"></button>
                </td>
              </tr>
            </ng-template>
          </p-table>
        </div>
      </div>
    </div>

    <!-- Diálogo para mostrar y agregar tarjetas -->
    <p-dialog header="Tarjetas de {{ selectedCliente?.name }}" [(visible)]="displayTarjetasDialog" [modal]="true" [style]="{width: '50vw', 'max-height': '90vh'}" [draggable]="false" [resizable]="false">
      <div *ngIf="displayTarjetasDialog" class="p-fluid">
        <h3>Tarjetas Entregadas</h3>
        <p *ngIf="tarjetasCliente.length === 0">No hay tarjetas registradas para este cliente.</p>
        <ul *ngIf="tarjetasCliente.length > 0">
          <li *ngFor="let tarjeta of tarjetasCliente">
            Fecha de Entrega: {{ tarjeta.deliveryDate | date: 'dd/MM/yyyy' }} - Número: {{ tarjeta.cardNumber || 'N/A' }}
          </li>
        </ul>

        <p-divider></p-divider>

        <h3>Agregar Nueva Tarjeta</h3>
        <form (ngSubmit)="saveNewTarjeta()">
          <div class="field">
            <label for="deliveryDate">Fecha de Entrega</label>
            <p-calendar *ngIf="renderCalendar" id="deliveryDate" [(ngModel)]="newTarjeta.deliveryDate" name="deliveryDate" dateFormat="yy-mm-dd" [showIcon]="true" inputId="icon" appendTo="body"></p-calendar>
          </div>
          <div class="field">
            <label for="cardNumber">Número de Tarjeta (Opcional)</label>
            <input pInputText id="cardNumber" type="text" [(ngModel)]="newTarjeta.cardNumber" name="cardNumber" />
          </div>
          <div class="flex justify-content-end mt-3">
            <button pButton type="submit" label="Guardar Tarjeta" icon="pi pi-save"></button>
          </div>
        </form>
      </div>
    </p-dialog>
  `,
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [];
  clientCount: number = 0;
  totalTarjetasCount: number = 0; // Nueva propiedad para el conteo total de tarjetas
  @ViewChild('dt') dt!: Table;

  displayTarjetasDialog: boolean = false;
  selectedCliente: Cliente | null = null;
  tarjetasCliente: Tarjeta[] = [];
  newTarjeta: Tarjeta = { clientId: '', deliveryDate: new Date().toISOString().split('T')[0] }; // Inicializar con string
  renderCalendar: boolean = false; // Nueva propiedad para controlar la renderización del calendario

  constructor(
    private clienteService: ClienteService,
    private messageService: MessageService,
    private tarjetaService: TarjetaService, // Inyectar TarjetaService
  ) {}

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe((data) => {
      this.clientes = data.results;
      this.clientCount = data.results.length;
      this.loadTarjetasCount(); // Cargar la cantidad de tarjetas para cada cliente
    });
    this.loadTotalTarjetasCount(); // Cargar el conteo total de tarjetas
  }

  loadTotalTarjetasCount(): void {
    this.tarjetaService.getTotalTarjetasCount().subscribe(response => {
      this.totalTarjetasCount = response.count;
    });
  }

  loadTarjetasCount(): void {
    this.clientes.forEach(cliente => {
      if (cliente._id) {
        this.tarjetaService.getTarjetasByCliente(cliente._id).subscribe(tarjetas => {
          cliente.tarjetasCount = tarjetas.length;
        });
      }
    });
  }

  showTarjetas(cliente: Cliente): void {
    this.selectedCliente = cliente;
    if (cliente._id) {
      this.tarjetaService.getTarjetasByCliente(cliente._id).subscribe(tarjetas => {
        this.tarjetasCliente = tarjetas;
        this.displayTarjetasDialog = true;
      });
    }
  }

  addTarjetaDialog(cliente: Cliente): void {
    this.selectedCliente = cliente;
    this.newTarjeta = { clientId: cliente._id || '', deliveryDate: new Date().toISOString().split('T')[0] }; // Inicializar con string
    this.tarjetasCliente = []; // Limpiar las tarjetas mostradas si se abre para agregar
    this.renderCalendar = false; // Ocultar el calendario antes de mostrar el diálogo
    this.displayTarjetasDialog = true;
    // Renderizar el calendario después de un pequeño retraso para asegurar que el DOM esté listo
    setTimeout(() => {
      this.renderCalendar = true;
    }, 0);
  }

  saveNewTarjeta(): void {
    if (this.selectedCliente && this.selectedCliente._id) {
      this.newTarjeta.clientId = this.selectedCliente._id;

      // Asegurarse de que deliveryDate sea un string en formato ISO
      let formattedDeliveryDate: string;
      if (this.newTarjeta.deliveryDate) {
        const dateObj = new Date(this.newTarjeta.deliveryDate);
        formattedDeliveryDate = dateObj.toISOString();
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'La fecha de entrega es requerida.' });
        return; // Salir de la función si la fecha no está presente
      }

      const tarjetaToSend: Tarjeta = {
        ...this.newTarjeta,
        deliveryDate: formattedDeliveryDate,
      };

      this.tarjetaService.addTarjeta(tarjetaToSend).subscribe({
        next: (tarjeta) => {
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Tarjeta agregada exitosamente.' });
          this.displayTarjetasDialog = false;
          this.loadTarjetasCount(); // Recargar el conteo de tarjetas por cliente
          this.loadTotalTarjetasCount(); // Recargar el conteo total de tarjetas
          if (this.selectedCliente) {
            this.showTarjetas(this.selectedCliente); // Mostrar las tarjetas actualizadas
          }
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al agregar tarjeta.' });
          console.error('Error al agregar tarjeta:', err);
        }
      });
    }
  }

  copyToClipboard(text: string): void {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Copiado',
          detail: 'Texto copiado al portapapeles',
        });
      })
      .catch((err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo copiar el texto',
        });
        console.error('Error al copiar al portapapeles:', err);
      });
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
    table.clear();
  }
}
