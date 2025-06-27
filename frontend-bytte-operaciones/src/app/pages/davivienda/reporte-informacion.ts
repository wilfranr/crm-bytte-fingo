import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-reporte-informacion',
  standalone: true,
  imports: [CommonModule, FormsModule, FileUploadModule, ToastModule, ToolbarModule],
  providers: [MessageService],
  template: `
    <div class="col-12">
      <div class="card">
        <h5>Reporte de Información y Generación de Indicadores Davivienda</h5>
        <p-toolbar>
          <div class="p-toolbar-group-left flex flex-wrap">
            <ul>
              <li>
                Descargar reporte cuenta digital:
                <a
                  href="https://casb.bytte.com.co/Dev/CASB.WebSiteBytte/(S(wopmmeahvfqnm35nbkflppc5))/Reportes/ReporteCuentaDigital"
                  target="_blank"
                  rel="noopener"
                  >CASB Davivienda</a
                >
              </li> 
              <li>
                Cargar reporte:
                <p-fileUpload
                  name="file"
                  customUpload="true"
                  chooseLabel="Seleccionar archivo"
                  uploadLabel="Subir archivo"
                  cancelLabel="Cancelar"
                  (uploadHandler)="customUpload($event)"
                  accept=".xlsx, .xls"
                >
                </p-fileUpload>
              </li>
              <div *ngIf="isLoading" class="loading-spinner">
                Procesando archivo, por favor espera...
              </div>
              <p-toast></p-toast>
            </ul>
          </div>

          <div class="p-toolbar-group-right">
            <div *ngIf="mailtoLink" class="email-button">
              <button
                pButton
                type="button"
                class="p-button-success p-component"
                (click)="openMailto()"
                icon="pi pi-envelope"
                iconPos="right"
              >
                Enviar archivo por correo
              </button>
            </div>
          </div>
        </p-toolbar>
      </div>
    </div>
  `,
  styles: [
    `
      .loading-spinner {
        font-size: 14px;
        font-weight: bold;
        color: #ff9800;
      }
      .email-button button {
        margin-top: 10px;
      }
    `,
  ],
})
export class ReporteInformacionComponent {
  isLoading: boolean = false; // Indicador de carga
  mailtoLink: string = ''; // Link mailto

  constructor(private messageService: MessageService) {}

  customUpload(event: { files: File[] }): void {
    if (!event.files || event.files.length === 0) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor selecciona un archivo para subir.',
      });
      return;
    }

    const formData = new FormData();
    formData.append('file', event.files[0]);

    this.isLoading = true;

    fetch(`${environment.apiUrl}/reporteinformacion/upload`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          const contentDisposition = response.headers.get(
            'Content-Disposition'
          );
          const fileNameMatch = contentDisposition?.match(/filename="(.+)"/);
          let yesterday = new Date(); 
          yesterday.setDate(yesterday.getDate() - 1); 
          let day = ("0" + yesterday.getDate()).slice(-2); 
          let month = ("0" + (yesterday.getMonth() + 1)).slice(-2); 
          let year = yesterday.getFullYear(); let formattedDate = `${day}-${month}-${year}`
          
          const fileName = fileNameMatch
            ? fileNameMatch[0]
            : 'Reporte de Información ' + formattedDate + '.xlsx';

          return response.blob().then((blob) => ({ blob, fileName }));
        } else {
          throw new Error('Error en la subida del archivo');
        }
      })
      .then(({ blob, fileName }) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
    
        this.generateMailtoLink(fileName);
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Archivo procesado y descargado exitosamente.',
        });
      })
      .catch((error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al subir o procesar el archivo.',
        });
      })
      .finally(() => {
        this.isLoading = false;
      });
    
    
    
  }

  generateMailtoLink(fileName: string): void {
    const toEmails =
      'jcortegon@davivienda.com,jpalonso@davivienda.com,paula.beltran@davivienda.com';
    const ccEmails =
      'mvpineros@davivienda.com,area.servicios@bytte.com.co,wcorreag@davivienda.com';
    const subject = encodeURIComponent(
      'Reporte de Información y generación indicadores (CONFIDENCIAL)'
    );
    const body = encodeURIComponent(
      `Buen día,\n\nAdjunto encontrarás el reporte generado: ${fileName}\n\nEl documento anexo se encuentra encriptado.`
    );
    this.mailtoLink = `mailto:${toEmails}?cc=${ccEmails}&subject=${subject}&body=${body}`;
  }

  openMailto(): void {
    if (this.mailtoLink) {
      window.open(this.mailtoLink, '_blank');
    } else {
      alert('El enlace no está disponible.');
    }
  }
}
