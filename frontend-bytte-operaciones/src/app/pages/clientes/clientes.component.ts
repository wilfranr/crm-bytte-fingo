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
import { Router } from '@angular/router'; // Importar Router
import { TagModule } from 'primeng/tag';

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
    TagModule,
  ],
  providers: [MessageService],
  templateUrl: './clientes.component.html',
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [];
  clientCount: number = 0;
  totalTarjetasCount: number = 0; // Nueva propiedad para el conteo total de tarjetas
  @ViewChild('dt') dt!: Table;

  displayTarjetasDialog: boolean = false;
  selectedCliente: Cliente | null = null;
  tarjetasCliente: Tarjeta[] = [];
  newTarjeta: Tarjeta = {
    clientId: '',
    deliveryDate: new Date().toISOString().split('T')[0],
  }; // Inicializar con string
  renderCalendar: boolean = false; // Nueva propiedad para controlar la renderización del calendario

  constructor(
    private clienteService: ClienteService,
    private messageService: MessageService,
    private tarjetaService: TarjetaService, // Inyectar TarjetaService
    private router: Router, // Inyectar Router
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
    this.tarjetaService.getTotalTarjetasCount().subscribe((response) => {
      this.totalTarjetasCount = response.count;
    });
  }

  loadTarjetasCount(): void {
    this.clientes.forEach((cliente) => {
      if (cliente._id) {
        this.tarjetaService
          .getTarjetasByCliente(cliente._id)
          .subscribe((tarjetas) => {
            cliente.tarjetasCount = tarjetas.length;
          });
      }
    });
  }

  showTarjetas(cliente: Cliente): void {
    this.selectedCliente = cliente;
    if (cliente._id) {
      this.tarjetaService
        .getTarjetasByCliente(cliente._id)
        .subscribe((tarjetas) => {
          this.tarjetasCliente = tarjetas;
          this.displayTarjetasDialog = true;
        });
    }
  }

  addTarjetaDialog(cliente: Cliente): void {
    this.selectedCliente = cliente;
    this.newTarjeta = {
      clientId: '',
      deliveryDate: new Date().toISOString().split('T')[0],
    }; // Inicializar con string
    this.tarjetasCliente = []; // Limpiar las tarjetas mostradas si se abre para agregar
    this.renderCalendar = false; // Ocultar el calendario antes de mostrar el diálogo
    setTimeout(() => {
      this.renderCalendar = true;
    }, 0);
    this.displayTarjetasDialog = true;
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
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'La fecha de entrega es requerida.',
        });
        return; // Salir de la función si la fecha no está presente
      }

      const tarjetaToSend: Tarjeta = {
        ...this.newTarjeta,
        deliveryDate: formattedDeliveryDate,
      };

      this.tarjetaService.addTarjeta(tarjetaToSend).subscribe({
        next: (tarjeta) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Tarjeta agregada exitosamente.',
          });
          this.displayTarjetasDialog = false;
          this.loadTarjetasCount(); // Recargar el conteo de tarjetas por cliente
          this.loadTotalTarjetasCount(); // Recargar el conteo total de tarjetas
          if (this.selectedCliente) {
            this.showTarjetas(this.selectedCliente); // Mostrar las tarjetas actualizadas
          }
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al agregar tarjeta.',
          });
          console.error('Error al agregar tarjeta:', err);
        },
      });
    }
  }

  editCliente(cliente: Cliente): void {
    if (cliente._id) {
      console.log(cliente._id);
      this.router.navigate(['/clientes/edit', cliente._id]);
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
