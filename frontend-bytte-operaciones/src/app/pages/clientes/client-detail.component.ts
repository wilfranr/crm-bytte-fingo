import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';

import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TimelineModule } from 'primeng/timeline';

import { DividerModule } from 'primeng/divider';

interface ClienteDetallado {
  id: string;
  nombreCompleto: string;
  documento: string;
  fechaNacimiento: string;
  telefono: string;
  email: string;
  direccion: string;
  profesion: string;
  estadoCliente: 'Activo' | 'Inactivo';
  perfilRiesgo: 'Bajo' | 'Medio' | 'Alto';
  producto: {
    tipoTarjeta: string;
    numeroEnmascarado: string;
    estadoTarjeta: 'Activa' | 'Bloqueada';
    lineaAprobada: number;
    lineaDisponible: number;
    tasaInteresEA: number;
    fechaCorte: string;
    fechaVencimiento: string;
  };
  perfilFinanciero: {
    puntajeCredito: number;
    ingresosVerificados: number;
    historialPagos: 'Puntual' | 'Atraso Leve' | 'Atraso';
  };
  interacciones: Array<{ fecha: string; canal: string; descripcion: string }>;
  casosSoporte: Array<{ id: string; fecha: string; asunto: string; estado: string }>;
  documentacion: Array<{ tipo: string; estado: string; fecha: string }>;
}

@Component({
  selector: 'app-client-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CardModule,
    TagModule,
    TableModule,
    TabViewModule,
    ButtonModule,
    RippleModule,
    TimelineModule,
    CardModule,
    DividerModule,
  ],
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss'],
})
export class ClientDetailComponent implements OnInit {
  cliente: ClienteDetallado | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';
    // Simulación de carga de datos a partir del id
    this.cliente = this.simularCargaCliente(id);
  }

  getIconForChannel(canal: string): string {
    switch (canal) {
      case 'App': return 'pi pi-mobile';
      case 'Web': return 'pi pi-globe';
      case 'Call Center': return 'pi pi-phone';
      default: return 'pi pi-user';
    }
  }

  getIconColor(canal: string): string {
    switch (canal) {
      case 'App': return '#6366F1'; // Indigo
      case 'Web': return '#3B82F6'; // Blue
      case 'Call Center': return '#10B981'; // Emerald
      default: return '#64748B'; // Slate
    }
  }

  private simularCargaCliente(id: string): ClienteDetallado {
    return {
      id,
      nombreCompleto: 'Juan Pérez',
      documento: 'CC 1.234.567.890',
      fechaNacimiento: '1990-05-12',
      telefono: '+57 300 123 4567',
      email: 'juan.perez@example.com',
      direccion: 'Calle 123 #45-67, Bogotá',
      profesion: 'Ingeniero de Sistemas',
      estadoCliente: 'Activo',
      perfilRiesgo: 'Bajo',
      producto: {
        tipoTarjeta: 'Crédito Mastercard',
        numeroEnmascarado: '**** **** **** 1234',
        estadoTarjeta: 'Activa',
        lineaAprobada: 10000000,
        lineaDisponible: 6200000,
        tasaInteresEA: 28.5,
        fechaCorte: '2025-09-05',
        fechaVencimiento: '2025-09-20',
      },
      perfilFinanciero: {
        puntajeCredito: 742,
        ingresosVerificados: 8500000,
        historialPagos: 'Puntual',
      },
      interacciones: [
        { fecha: '2025-08-15', canal: 'App', descripcion: 'Consulta de movimientos' },
        { fecha: '2025-08-08', canal: 'Web', descripcion: 'Descarga extracto' },
        { fecha: '2025-07-29', canal: 'Call Center', descripcion: 'Cambio de dirección' },
      ],
      casosSoporte: [
        { id: 'FD-10234', fecha: '2025-08-10', asunto: 'Cobro duplicado', estado: 'Abierto' },
        { id: 'FD-10087', fecha: '2025-07-18', asunto: 'Problema con PIN', estado: 'Cerrado' },
      ],
      documentacion: [
        { tipo: 'Identificación', estado: 'Verificado', fecha: '2024-12-02' },
        { tipo: 'Selfie', estado: 'Verificado', fecha: '2024-12-02' },
        { tipo: 'Comprobante de domicilio', estado: 'Pendiente', fecha: '—' },
      ],
    };
  }
}


