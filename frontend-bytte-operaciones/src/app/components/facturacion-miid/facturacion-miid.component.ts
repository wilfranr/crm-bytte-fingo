import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacturacionService } from '../../services/facturacion.service';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';
import { ProgressBarModule } from 'primeng/progressbar';

@Component({
  selector: 'app-facturacion-miid',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    MessageModule,
    ProgressSpinnerModule,
    ToastModule,
    FileUploadModule,
    ProgressBarModule,
  ],
  templateUrl: './facturacion-miid.component.html',
  // styleUrls: ['./facturacion-miid.component.scss'],
  providers: [MessageService], // Proveer MessageService para los mensajes
})
export class FacturacionMiidComponent {
  isLoading: boolean = false;
  message: { severity: string; text: string } | null = null;
  results: { enrolados: number; noEnrolados: number } | null = null;
  uploadedFiles: any[] = [];
  progressValue = 0;

  constructor(
    private facturacionService: FacturacionService,
    private messageService: MessageService,
  ) {}

  onSelectFile(event: any): void {
    const file = event.files[0];
    if (file) {
      this.isLoading = true;
      this.progressValue = 0; // Reiniciar barra
      this.message = null;
      this.results = null;

      // Simular progreso (sube de 0 a 90 mientras el proceso real responde)
      const fakeProgress = setInterval(() => {
        if (this.progressValue < 90) {
          this.progressValue += 10;
        }
      }, 200);

      this.facturacionService.procesarArchivo(file).subscribe(
        (response: Blob) => {
          this.isLoading = false;
          if (response.type === 'application/json') {
            // Si la respuesta es JSON, es un error del servidor
            response.text().then((text) => {
              const errorData = JSON.parse(text);
              this.message = {
                severity: 'error',
                text: errorData.message || 'Error desconocido del servidor.',
              };
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: errorData.message || 'Error desconocido del servidor.',
              });
            });
          } else {
            const blob = new Blob([response], {
              type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Consolidado_miid.xlsx';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Archivo consolidado descargado con éxito.',
            });
            this.uploadedFiles = []; // Limpiar la lista de archivos subidos
          }
        },
        (error) => {
          clearInterval(fakeProgress);
          this.progressValue = 100;
          setTimeout(() => {
            this.isLoading = false;
            this.message = {
              severity: 'error',
              text: error.error.message || 'Error desconocido',
            };
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: error.error.message || 'Error desconocido',
            });
          }, 300);
        },
      );
    }
  }

  openReportMiid(): void {
    const today = new Date();
    const currentMonth = today.getMonth(); // 0-11
    const currentYear = today.getFullYear();

    // Calcular el primer día del mes actual
    const firstDayCurrentMonth = new Date(currentYear, currentMonth, 1);

    // Calcular el primer día del mes anterior
    const firstDayPreviousMonth = new Date(currentYear, currentMonth - 1, 1);

    // Formatear fechas a YYYY/MM/DD
    const formatDate = (date: Date) => {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}/${month}/${day}`;
    };

    const fechaInicio = formatDate(firstDayPreviousMonth);
    const fechaFinal = formatDate(firstDayCurrentMonth);

    const url = `https://web.miid.bio/MiiD/MIIDReports/?IdOpcion=ReporteDetalleTransacciones&FechaInicio=${fechaInicio}&FechaFinal=${fechaFinal}&TipoDocumento=&NumeroDocumento=&Estado=&IdEc=-1&IdEcb=-1&IdEcParent=100&NivelPermiso=0`;

    window.open(url, '_blank');
  }
}
