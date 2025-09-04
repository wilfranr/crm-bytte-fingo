import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';

interface Transaccion {
  lp_creation_date: string;
  per_id: string;
  lp_status_process: number;
}

interface TransaccionPorHora {
  hora: string;
  total: number;
}

/**
 * @description Widget que muestra una gráfica de líneas con las transacciones agrupadas por hora del día.
 * Se integra con el dashboard de MIID para mostrar el comportamiento temporal de las transacciones.
 */
@Component({
  selector: 'app-transacciones-por-hora-widget',
  standalone: true,
  imports: [
    CommonModule,
    ChartModule
  ],
  template: `
    <div class="col-span-12 xl:col-span-6">
      <div class="card h-full">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="font-semibold text-xl text-surface-900 dark:text-surface-0 mb-1">Transacciones por Hora</h3>
            <p class="text-sm text-muted-color">Actividad transaccional durante el día</p>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span class="text-sm text-muted-color">Total Transacciones</span>
          </div>
        </div>
        <div class="relative" style="height: 300px;">
          <p-chart type="line" [data]="lineData" [options]="lineOptions"></p-chart>
        </div>
      </div>
    </div>
  `
})
export class TransaccionesPorHoraWidget implements OnInit, OnChanges {
  @Input() transacciones: Transaccion[] = [];
  transaccionesPorHora: TransaccionPorHora[] = [];
  
  lineData: any;
  lineOptions: any;

  constructor() {}

  ngOnInit() {
    this.initializeChartOptions();
    if (this.transacciones && this.transacciones.length) {
      this.procesarTransaccionesPorHora();
      this.actualizarGrafica();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['transacciones']) {
      this.procesarTransaccionesPorHora();
      this.actualizarGrafica();
    }
  }

  /**
   * @description Carga las transacciones del día desde el backend.
   */
  // Datos provienen del padre vía @Input()

  /**
   * @description Procesa las transacciones agrupándolas por hora.
   */
  procesarTransaccionesPorHora() {
    // Inicializar array con las 24 horas del día
    const horas = Array.from({ length: 24 }, (_, i) => 
      i.toString().padStart(2, '0') + ':00'
    );
    
    this.transaccionesPorHora = horas.map(hora => ({
      hora: hora,
      total: 0
    }));

    // Procesar cada transacción
    this.transacciones.forEach(transaccion => {
      const fecha = new Date(transaccion.lp_creation_date);
      const hora = fecha.getHours();
      const horaStr = hora.toString().padStart(2, '0') + ':00';
      
      const index = this.transaccionesPorHora.findIndex(h => h.hora === horaStr);
      if (index !== -1) {
        this.transaccionesPorHora[index].total++;
      }
    });
  }

  /**
   * @description Inicializa las opciones de la gráfica.
   */
  initializeChartOptions() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.lineOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      responsive: true,
      interaction: {
        intersect: false,
        mode: 'index'
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#ffffff',
          bodyColor: '#ffffff',
          borderColor: '#374151',
          borderWidth: 1,
          cornerRadius: 8,
          displayColors: false,
          callbacks: {
            title: function(context: any) {
              return `Hora: ${context[0].label}`;
            },
            label: function(context: any) {
              return `Transacciones: ${context.parsed.y}`;
            }
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#ffffff',
            font: {
              size: 11
            },
            maxRotation: 45,
            minRotation: 0
          },
          grid: {
            color: '#374151',
            drawBorder: false,
            lineWidth: 0.5
          }
        },
        y: {
          ticks: {
            color: '#ffffff',
            font: {
              size: 11
            },
            padding: 8,
            stepSize: 5
          },
          grid: {
            color: '#374151',
            drawBorder: false,
            lineWidth: 0.5
          },
          beginAtZero: true
        }
      },
      elements: {
        point: {
          radius: 5,
          hoverRadius: 8,
          backgroundColor: '#ffffff',
          borderColor: '#3b82f6',
          borderWidth: 3,
          hoverBackgroundColor: '#ffffff',
          hoverBorderColor: '#1d4ed8',
          hoverBorderWidth: 4
        },
        line: {
          borderWidth: 3,
          borderCapStyle: 'round',
          borderJoinStyle: 'round'
        }
      }
    };
  }

  /**
   * @description Actualiza los datos de la gráfica.
   */
  actualizarGrafica() {
    const documentStyle = getComputedStyle(document.documentElement);
    
    this.lineData = {
      labels: this.transaccionesPorHora.map(h => h.hora),
      datasets: [
        {
          label: 'Total Transacciones',
          data: this.transaccionesPorHora.map(h => h.total),
          fill: false,
          backgroundColor: '#3b82f6',
          borderColor: '#3b82f6',
          tension: 0.4,
          pointBackgroundColor: '#ffffff',
          pointBorderColor: '#3b82f6',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6
        }
      ]
    };
  }
}
