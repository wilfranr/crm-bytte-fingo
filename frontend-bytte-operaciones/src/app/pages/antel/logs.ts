import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { MessageModule } from 'primeng/message';


/**
 * @description Componente para la revisión y procesamiento de logs de Antel.
 * Permite subir archivos para su procesamiento y muestra el estado de la operación.
 */
@Component({
  selector: 'app-logs',
  standalone: true,
  imports: [CommonModule, FormsModule, FileUploadModule, ToastModule, ToolbarModule, MessageModule],
  providers: [MessageService],
  template: `
  <div class="col-12">
    <h5>Acá se van a procesar los logs de Antel</h5>
    <p-toolbar>
      <div class="p-toolbar-group-left flex flex-wrap">
        <ul>
          <li>Seleccionar archivo:</li>
          <li>
            <p-fileUpload
              name="file"
              customUpload="true"
              chooseLabel="Seleccionar archivo"
              uploadLabel="Subir archivo"
              cancelLabel="Cancelar"
              accept=".xlsx, .xls"
            >
            </p-fileUpload>
          </li>
        </ul>
      </div>
      <div class="p-toolbar-group-right">
        <button pButton type="button" class="p-button-success p-component" icon="pi pi-upload" iconPos="right">
          Procesar archivo
        </button>
        
        <button pButton type="button" class="p-button-danger p-component" icon="pi pi-times" iconPos="right">
          Cancelar
        </button>
        
        <div *ngIf="isLoading" class="loading-spinner">
          Procesando archivo, por favor espera...
          <i class="pi pi-spin pi-spinner"></i>
          
          <p-toast></p-toast>
          <p-message
            severity="info"
            summary="Información"
            detail="El archivo se ha procesado correctamente"
            [life]="3000"
          ></p-message>
          <p-message
            severity="error"
            summary="Error"
            detail="Error al procesar el archivo"
            [life]="3000"
          ></p-message>
          
          <p-message
            severity="success"
            summary="Éxito"
            detail="El archivo se ha procesado correctamente"
            [life]="3000"
          ></p-message>
        </div>
    
    
  </div>
  `,	
})

export class LogsComponent {
  /**
   * @description Indicador de carga para mostrar el estado de procesamiento.
   */
  isLoading: boolean = false; 
  /**
   * @description Enlace mailto para enviar correos.
   */
  mailtoLink: string = ''; 

  /**
   * @description Constructor del componente LogsComponent.
   * @param messageService Servicio para mostrar mensajes de notificación.
   */
  constructor(private messageService: MessageService) {}

  /**
   * @description Maneja la subida personalizada de archivos.
   * Simula un procesamiento y muestra mensajes de éxito o error.
   * @param event Objeto de evento que contiene los archivos seleccionados.
   */
  customUpload(event: { files: File[] }): void {
    if (!event.files || event.files.length === 0) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se seleccionó ningún archivo',
      });
      return;
    }

    this.isLoading = true; // Iniciar carga

    setTimeout(() => {
      this.isLoading = false; // Finalizar carga
      this.messageService.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'El archivo se ha procesado correctamente',
      });
    }, 2000); // Simular tiempo de procesamiento
  }

  /**
   * @description Abre un enlace mailto en el navegador.
   */
  openMailto(): void {
    window.location.href = this.mailtoLink;
  }
}