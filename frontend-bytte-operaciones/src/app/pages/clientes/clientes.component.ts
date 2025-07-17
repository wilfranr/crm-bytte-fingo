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

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, TableModule, ToastModule, MessageModule, InputTextModule, IconFieldModule, InputIconModule, ButtonModule],
  providers: [MessageService],
  template: `
    <p-toast></p-toast>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
      <div class="col-span-12 lg:col-span-6 xl:col-span-3">
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
      <div class="col-span-12 lg:col-span-6 xl:col-span-9">
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
          <p-table #dt [value]="clientes" [paginator]="true" [rows]="10" [globalFilterFields]="['name', 'email', 'mobile', 'company.name', 'custom_fields.id_formulario']">
            <ng-template pTemplate="caption">
                <div class="flex justify-content-between align-items-center flex-column sm:flex-row">
                    <button pButton label="Clear" class="p-button-outlined mb-2" icon="pi pi-filter-slash" (click)="clear(dt)"></button>
                    <p-iconfield iconPosition="left" class="ml-auto">
                        <p-inputicon>
                            <i class="pi pi-search"></i>
                        </p-inputicon>
                        <input pInputText type="text" (input)="onGlobalFilter(dt, $event)" placeholder="Search keyword" />
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
                <td (dblclick)="copyToClipboard(cliente.company.name)">
                  {{ cliente.company.name }}
                </td>
                <td
                  (dblclick)="
                    copyToClipboard(cliente.custom_fields.id_formulario)
                  "
                >
                  {{ cliente.custom_fields.id_formulario }}
                </td>
              </tr>
            </ng-template>
          </p-table>
        </div>
      </div>
    </div>
  `,
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [];
  clientCount: number = 0;
  @ViewChild('dt') dt!: Table;

  constructor(
    private clienteService: ClienteService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe((data) => {
      this.clientes = data.results;
      this.clientCount = data.results.length;
    });
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
