import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetricCardComponent } from '../../../shared/components/metric-card/metric-card.component';

/**
 * @description Widget que muestra un conjunto de tarjetas de métricas.
 * Recibe los datos del dashboard y muestra las métricas principales.
 */
@Component({
  standalone: true,
  selector: 'app-metric-cards-widget',
  imports: [CommonModule, MetricCardComponent],
  template: `
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      <!-- Tarjeta 1: Total de Transacciones Hoy -->
      <app-metric-card *ngIf="dashboardData"
        title="Transacciones Hoy"
        [value]="(dashboardData.totalTransacciones || 0) | number"
        icon="pi-shopping-cart"
        color="blue"
        [trendValue]="((dashboardData.totalTransacciones || 0) * 0.08 | number:'1.0-0') + '%'"
        trendDirection="up"
        trendText="respecto a ayer"
      ></app-metric-card>

      <!-- Tarjeta 2: % Éxito Transacciones -->
      <app-metric-card *ngIf="dashboardData"
        title="% Éxito Transacciones"
        [value]="(dashboardData.porcentajeExitoTransacciones || 0 | number:'1.2-2') + '%'"
        icon="pi-percentage"
        color="orange"
        [trendValue]="((dashboardData.porcentajeExitoTransacciones || 0) * 0.05 | number:'1.0-0') + '%'"
        trendDirection="up"
        trendText="respecto al mes anterior"
      ></app-metric-card>

      <!-- Tarjeta 3: Clientes Únicos Hoy -->
      <app-metric-card *ngIf="dashboardData"
        title="Clientes Únicos"
        [value]="(dashboardData.totalClientes || 0) | number"
        icon="pi-users"
        color="green"
        [trendValue]="((dashboardData.totalClientes || 0) * 0.12 | number:'1.0-0') + '%'"
        trendDirection="up"
        trendText="respecto a ayer"
      ></app-metric-card>


      <!-- Tarjeta 4: % Éxito Clientes -->
      <app-metric-card *ngIf="dashboardData"
        title="% Éxito Clientes"
        [value]="(dashboardData.porcentajeExitoClientes || 0 | number:'1.2-2') + '%'"
        icon="pi-user-plus"
        color="purple"
        [trendValue]="((dashboardData.porcentajeExitoClientes || 0) * 0.03 | number:'1.0-0') + '%'"
        trendDirection="up"
        trendText="respecto al mes anterior"
      ></app-metric-card>

      <!-- Tarjeta 5: Promedio de Intentos -->
      <app-metric-card *ngIf="dashboardData"
        title="Promedio de Intentos"
        [value]="(dashboardData.promedioIntentos || 0) | number:'1.2-2'"
        icon="pi-sync"
        color="pink"
        [trendValue]="((dashboardData.promedioIntentos || 0) * 0.1 | number:'1.0-0') + '%'"
        trendDirection="down"
        trendText="respecto al mes anterior"
      ></app-metric-card>
    </div>
  `
})
export class MetricCardsWidget {
  /**
   * @description Datos del dashboard que contienen las métricas a mostrar.
   */
  @Input() dashboardData: {
    totalTransacciones?: number;
    totalClientes?: number;
    porcentajeExitoTransacciones?: number;
    porcentajeExitoClientes?: number;
    promedioIntentos?: number;
  } | null = null;
}
