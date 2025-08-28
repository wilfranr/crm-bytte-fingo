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
      <div class="card">
        <div class="font-semibold text-xl mb-4">Transacciones por Hora</div>
        <p-chart type="line" [data]="lineData" [options]="lineOptions"></p-chart>
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
      plugins: {
        legend: {
          labels: {
            color: '#ffffff',
            font: {
              size: 12,
              weight: '500'
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
          radius: 4,
          hoverRadius: 6,
          backgroundColor: '#ffffff',
          borderColor: '#3b82f6',
          borderWidth: 2
        },
        line: {
          borderWidth: 3
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
