import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacturacionCasbService } from '../../services/facturacion-casb.service';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';
import { ProgressBarModule } from 'primeng/progressbar';

@Component({
  selector: 'app-facturacion-casb',
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
  templateUrl: './facturacion-casb.component.html',
  // styleUrls: ['./facturacion-casb.component.scss'],
  providers: [MessageService], // Proveer MessageService para los mensajes
})
export class FacturacionCasbComponent {
  isLoading: boolean = false;
  message: { severity: string; text: string } | null = null;
  results: { enrolados: number; noEnrolados: number } | null = null;
  uploadedFiles: any[] = [];
  progressValue = 0;

  constructor(
    private facturacionCasbService: FacturacionCasbService,
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

      this.facturacionCasbService.procesarArchivoCasb(file).subscribe(
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
            a.download = 'Consolidado_casb.xlsx';
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
}
