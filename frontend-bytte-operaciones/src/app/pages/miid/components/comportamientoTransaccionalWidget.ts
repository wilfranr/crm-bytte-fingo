import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { debounceTime, Subscription } from 'rxjs';
import { LayoutService } from '../../../layout/service/layout.service';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Register the datalabels plugin
Chart.register(ChartDataLabels);

interface DashboardData {
  totalTransacciones: number;
  transaccionesExitosas: number;
  transaccionesNegadas: number;
  totalClientes: number;
  clientesExitosos: number;
  clientesNegados: number;
  porcentajeExitoTransacciones: number;
  porcentajeExitoClientes: number;
  promedioIntentos: number;
}

/**
 * @description Widget que muestra un gráfico de barras de los ingresos por diferentes fuentes.
 * Se actualiza dinámicamente con los cambios de configuración del layout.
 */
@Component({
  standalone: true,
  selector: 'app-comportamiento-transaccional-widget',
  imports: [ChartModule],
  template: `<div class="col-span-12 xl:col-span-6">
    <div class="card h-full">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h3 class="font-semibold text-xl text-surface-900 dark:text-surface-0 mb-1">Comportamiento Transaccional</h3>
          <p class="text-sm text-muted-color">Los valores se muestran en cantidad de transacciones/clientes</p>
        </div>
      </div>
      <div class="relative" style="height: 350px;">
        <p-chart
          type="bar"
          [data]="chartData"
          [options]="chartOptions"
        ></p-chart>
      </div>
    </div>
  </div>`,
})
export class ComportamientoTransaccionalWidget implements OnChanges, OnDestroy {
  @Input() dashboardData: DashboardData | null = null;
  /**
   * @description Datos para el gráfico de barras.
   */
  chartData: any;

  /**
   * @description Opciones de configuración para el gráfico de barras.
   */
  chartOptions: any;

  /**
   * @description Suscripción a los cambios de configuración del layout.
   */
  subscription!: Subscription;

  /**
   * @description Constructor del componente ComportamientoTransaccionalWidget.
   * @param layoutService Servicio para gestionar el estado del layout.
   */
  constructor(public layoutService: LayoutService) {
    this.subscription = this.layoutService.configUpdate$
      .pipe(debounceTime(25))
      .subscribe(() => {
        this.initChart();
      });
  }

  /**
   * @description Hook del ciclo de vida de Angular que se ejecuta después de que el componente ha sido inicializado.
   * Inicializa los datos y opciones del gráfico.
   */
  ngOnChanges(changes: SimpleChanges) {
    console.log('Cambios en dashboardData:', changes);
    if (changes['dashboardData']) {
      console.log('Nuevos datos recibidos:', this.dashboardData);
      if (this.dashboardData) {
        this.initChart();
      } else {
        console.warn('dashboardData es null o undefined');
      }
    }
  }

  /**
   * @description Inicializa los datos y opciones del gráfico de barras.
   * Configura los colores y etiquetas del gráfico basándose en el tema actual.
   */
  initChart() {
    console.log('Inicializando gráfico con datos:', this.dashboardData);
    
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color') || '#333';
    const primaryColor = documentStyle.getPropertyValue('--primary-color') || '#6366F1';
    const successColor = documentStyle.getPropertyValue('--green-500') || '#10B981';
    const dangerColor = documentStyle.getPropertyValue('--red-500') || '#EF4444';
    const borderColor = documentStyle.getPropertyValue('--surface-border') || '#e0e0e0';
    
    if (!this.dashboardData) {
      console.warn('No hay datos para inicializar el gráfico');
      return;
    }

    try {
      this.chartData = {
        labels: [
          'Total Transacciones', 
          'Trans. Exitosas', 
          'Trans. Negadas', 
          'Total Clientes', 
          'Clientes Exitosos', 
          'Clientes Negados'
        ],
        datasets: [
          {
            type: 'bar',
            label: 'Cantidad',
            backgroundColor: [
              primaryColor,
              successColor,
              dangerColor,
              primaryColor,
              successColor,
              dangerColor
            ],
            borderColor: 'transparent',
            borderWidth: 0,
            data: [
              this.dashboardData.totalTransacciones || 0,
              this.dashboardData.transaccionesExitosas || 0,
              this.dashboardData.transaccionesNegadas || 0,
              this.dashboardData.totalClientes || 0,
              this.dashboardData.clientesExitosos || 0,
              this.dashboardData.clientesNegados || 0
            ],
            barThickness: 60,
            borderRadius: 4,
          }
        ]
      };

      this.chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 0.9,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: '#ffffff',
            bodyColor: '#ffffff',
            borderColor: borderColor,
            borderWidth: 1,
            cornerRadius: 6,
            displayColors: false,
            callbacks: {
              label: (context: any) => {
                return `${context.dataset.label}: ${context.raw}`;
              }
            }
          },
          datalabels: {
            display: true,
            color: '#ffffff', // Texto blanco para mejor contraste
            anchor: 'center', // Centrar la etiqueta en la barra
            align: 'center',  // Alinear al centro
            offset: 0,        // Sin desplazamiento
            font: {
              weight: 'bold',
              size: 12
            },
            formatter: (value: any) => {
              return value > 0 ? value : ''; // Solo muestra etiqueta si el valor es mayor a 0
            },
            // Asegurar que las etiquetas siempre sean visibles
            clip: false,
            // Fondo transparente para mejor legibilidad dentro de la barra
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            borderRadius: 4,
            padding: 2
          }
        },
        scales: {
          x: {
            grid: {
              display: false,
              drawBorder: false
            },
            ticks: {
              color: textColor,
              maxRotation: 0,
              minRotation: 0,
              autoSkip: false,
              font: {
                size: 12
              },
              padding: 12
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              color: borderColor,
              drawBorder: false
            },
            ticks: {
              color: textColor,
              callback: (value: any) => value.toString()
            }
          }
        },
        animation: {
          duration: 500,
          easing: 'easeInOutQuart'
        },
        elements: {
          bar: {
            borderWidth: 0
          }
        }
      };

      console.log('Gráfico inicializado con éxito');
    } catch (error) {
      console.error('Error al inicializar el gráfico:', error);
    }
  }

  /**
   * @description Hook del ciclo de vida de Angular que se ejecuta cuando el componente es destruido.
   * Desuscribe la suscripción para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
