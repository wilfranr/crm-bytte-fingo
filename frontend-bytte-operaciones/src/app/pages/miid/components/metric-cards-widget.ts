import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * @description Widget que muestra un conjunto de tarjetas de métricas.
 * Recibe los datos del dashboard y muestra las métricas principales.
 */
@Component({
  standalone: true,
  selector: 'app-metric-cards-widget',
  imports: [CommonModule],
  template: `
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
      <!-- Tarjeta 1: Total de Transacciones Hoy -->
      <div class="col-span-1" *ngIf="dashboardData">
        <div class="card mb-0 h-full">
          <div class="flex justify-between items-start mb-4">
            <div class="flex-1 min-w-0">
              <span class="block text-muted-color font-medium mb-2 text-sm">Transacciones Hoy</span>
              <div class="text-surface-900 dark:text-surface-0 font-bold text-2xl">{{ (dashboardData.totalTransacciones || 0) | number }}</div>
            </div>
            <div class="flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-lg ml-3" style="width: 3rem; height: 3rem; flex-shrink: 0;">
              <i class="pi pi-shopping-cart text-blue-500 text-xl"></i>
            </div>
          </div>
          <div class="flex items-center gap-1">
            <i class="pi pi-arrow-up text-green-500 text-xs"></i>
            <span class="text-green-500 font-semibold text-sm">3%</span>
            <span class="text-muted-color text-xs">respecto a ayer</span>
          </div>
        </div>
      </div>

      <!-- Tarjeta 2: % Éxito Transacciones -->
      <div class="col-span-1" *ngIf="dashboardData">
        <div class="card mb-0 h-full">
          <div class="flex justify-between items-start mb-4">
            <div class="flex-1 min-w-0">
              <span class="block text-muted-color font-medium mb-2 text-sm">% Éxito Transacciones</span>
              <div class="text-surface-900 dark:text-surface-0 font-bold text-2xl">{{ (dashboardData.porcentajeExitoTransacciones || 0 | number:'1.2-2') + '%' }}</div>
            </div>
            <div class="flex items-center justify-center bg-orange-100 dark:bg-orange-400/10 rounded-lg ml-3" style="width: 3rem; height: 3rem; flex-shrink: 0;">
              <i class="pi pi-percentage text-orange-500 text-xl"></i>
            </div>
          </div>
          <div class="flex items-center gap-1">
            <i class="pi pi-arrow-up text-green-500 text-xs"></i>
            <span class="text-green-500 font-semibold text-sm">5%</span>
            <span class="text-muted-color text-xs">respecto al mes anterior</span>
          </div>
        </div>
      </div>

      <!-- Tarjeta 3: Clientes Únicos Hoy -->
      <div class="col-span-1" *ngIf="dashboardData">
        <div class="card mb-0 h-full">
          <div class="flex justify-between items-start mb-4">
            <div class="flex-1 min-w-0">
              <span class="block text-muted-color font-medium mb-2 text-sm">Clientes Únicos</span>
              <div class="text-surface-900 dark:text-surface-0 font-bold text-2xl">{{ (dashboardData.totalClientes || 0) | number }}</div>
            </div>
            <div class="flex items-center justify-center bg-cyan-100 dark:bg-cyan-400/10 rounded-lg ml-3" style="width: 3rem; height: 3rem; flex-shrink: 0;">
              <i class="pi pi-users text-cyan-500 text-xl"></i>
            </div>
          </div>
          <div class="flex items-center gap-1">
            <i class="pi pi-arrow-up text-green-500 text-xs"></i>
            <span class="text-green-500 font-semibold text-sm">4%</span>
            <span class="text-muted-color text-xs">respecto a ayer</span>
          </div>
        </div>
      </div>

      <!-- Tarjeta 4: % Éxito Clientes -->
      <div class="col-span-1" *ngIf="dashboardData">
        <div class="card mb-0 h-full">
          <div class="flex justify-between items-start mb-4">
            <div class="flex-1 min-w-0">
              <span class="block text-muted-color font-medium mb-2 text-sm">% Éxito Clientes</span>
              <div class="text-surface-900 dark:text-surface-0 font-bold text-2xl">{{ (dashboardData.porcentajeExitoClientes || 0 | number:'1.2-2') + '%' }}</div>
            </div>
            <div class="flex items-center justify-center bg-purple-100 dark:bg-purple-400/10 rounded-lg ml-3" style="width: 3rem; height: 3rem; flex-shrink: 0;">
              <i class="pi pi-user-plus text-purple-500 text-xl"></i>
            </div>
          </div>
          <div class="flex items-center gap-1">
            <i class="pi pi-arrow-up text-green-500 text-xs"></i>
            <span class="text-green-500 font-semibold text-sm">3%</span>
            <span class="text-muted-color text-xs">respecto al mes anterior</span>
          </div>
        </div>
      </div>

      <!-- Tarjeta 5: Promedio de Intentos -->
      <div class="col-span-1" *ngIf="dashboardData">
        <div class="card mb-0 h-full">
          <div class="flex justify-between items-start mb-4">
            <div class="flex-1 min-w-0">
              <span class="block text-muted-color font-medium mb-2 text-sm">Promedio de Intentos</span>
              <div class="text-surface-900 dark:text-surface-0 font-bold text-2xl">{{ (dashboardData.promedioIntentos || 0) | number:'1.2-2' }}</div>
            </div>
            <div class="flex items-center justify-center bg-pink-100 dark:bg-pink-400/10 rounded-lg ml-3" style="width: 3rem; height: 3rem; flex-shrink: 0;">
              <i class="pi pi-sync text-pink-500 text-xl"></i>
            </div>
          </div>
          <div class="flex items-center gap-1">
            <i class="pi pi-arrow-down text-red-500 text-xs"></i>
            <span class="text-red-500 font-semibold text-sm">0%</span>
            <span class="text-muted-color text-xs">respecto al mes anterior</span>
          </div>
        </div>
      </div>
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
