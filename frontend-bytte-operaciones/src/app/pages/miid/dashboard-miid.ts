import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { interval, Subscription, throwError } from 'rxjs';
import { catchError, finalize, switchMap } from 'rxjs/operators';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageModule } from 'primeng/message';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { PanelModule } from 'primeng/panel';
import { MetricCardsWidget } from './components/metric-cards-widget';
import { ComportamientoTransaccionalWidget } from './components/comportamientoTransaccionalWidget';

export interface DashboardData {
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

@Component({
  selector: 'app-dashboard-miid',
  standalone: true,
  imports: [
    CommonModule,
    ProgressSpinnerModule,
    MessageModule,
    CardModule,
    TableModule,
    ButtonModule,
    TooltipModule,
    TagModule,
    DividerModule,
    PanelModule,
    MetricCardsWidget,
    ComportamientoTransaccionalWidget,
  ],
  providers: [MessageService],
  templateUrl: './dashboard-miid.component.html',
  styleUrls: ['./dashboard-miid.component.scss'],
})
export class DashboardMiidComponent implements OnInit, OnDestroy {
  dashboardData: DashboardData | null = null;
  loading = true;
  error: string | null = null;
  private refreshSubscription: Subscription | undefined;
  private readonly REFRESH_INTERVAL = 1800000; // 30 minutos

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) {}

  ngOnInit() {
    // Cargar datos iniciales
    this.loadDashboardData();

    // Configurar actualización periódica
    this.setupAutoRefresh();
  }

  ngOnDestroy() {
    // Limpiar la suscripción al destruir el componente
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  private setupAutoRefresh() {
    this.refreshSubscription = interval(this.REFRESH_INTERVAL).subscribe(() => {
      this.loadDashboardData(false);
    });
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocurrió un error al cargar los datos del dashboard.';

    if (error.status === 0) {
      errorMessage =
        'No se pudo conectar con el servidor. Verifica tu conexión a internet.';
    } else if (error.status === 401) {
      errorMessage = 'No estás autorizado para ver esta información.';
    } else if (error.status >= 500) {
      errorMessage =
        'Error del servidor. Por favor, inténtalo de nuevo más tarde.';
    }

    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: errorMessage,
      life: 5000,
    });

    return throwError(() => new Error(errorMessage));
  }

  // Datos de prueba para desarrollo
  private getMockData(): DashboardData {
    return {
      totalTransacciones: 23, // Ejemplo: 23 transacciones hoy
      transaccionesExitosas: 18, // Ejemplo: 18 transacciones exitosas
      transaccionesNegadas: 5, // 23 - 18 = 5 transacciones negadas
      totalClientes: 18, // 18 clientes únicos hoy
      clientesExitosos: 15, // 15 clientes con al menos 1 transacción exitosa
      clientesNegados: 3, // 18 - 15 = 3 clientes sin transacciones exitosas
      porcentajeExitoTransacciones: 78.26, // (18/23)*100
      porcentajeExitoClientes: 83.33, // (15/18)*100
      promedioIntentos: 1.28, // 23/18
    };
  }

  loadDashboardData(showLoading = true) {
    if (showLoading) {
      this.loading = true;
      this.error = null;
    }

    // Usando datos reales del backend
    this.http
      .get<DashboardData>('/api/dashboard')
      .pipe(
        catchError((error) => {
          this.error = 'Error al cargar los datos del dashboard';
          return this.handleError(error);
        }),
        finalize(() => {
          if (showLoading) {
            this.loading = false;
          }
        }),
      )
      .subscribe({
        next: (data) => {
          this.dashboardData = data;
        },
      });
  }
}
