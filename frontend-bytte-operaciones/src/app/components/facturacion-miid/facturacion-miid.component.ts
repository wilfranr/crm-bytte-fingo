import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacturacionService } from '../../services/facturacion.service';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-facturacion-miid',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    MessageModule,
    ProgressSpinnerModule,
    ToastModule
  ],
  templateUrl: './facturacion-miid.component.html',
  styleUrls: ['./facturacion-miid.component.scss'],
  providers: [MessageService] // Proveer MessageService para los mensajes
})
export class FacturacionMiidComponent {

  selectedFile: File | null = null;
  isLoading: boolean = false;
  message: { severity: string, text: string } | null = null;
  results: { enrolados: number, noEnrolados: number } | null = null;

  constructor(private facturacionService: FacturacionService, private messageService: MessageService) { }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
    this.results = null; // Limpiar resultados anteriores al seleccionar un nuevo archivo
    this.message = null;
  }

  onUpload(): void {
    if (this.selectedFile) {
      this.isLoading = true;
      this.message = null;
      this.results = null;
      this.facturacionService.procesarArchivo(this.selectedFile).subscribe(
        (response) => {
          this.isLoading = false;
          this.results = { enrolados: response.enrolados, noEnrolados: response.noEnrolados };
          this.messageService.add({severity:'success', summary: 'Éxito', detail: response.message});
        },
        (error) => {
          this.isLoading = false;
          this.message = { severity: 'error', text: error.error.message || 'Error desconocido' };
          this.messageService.add({severity:'error', summary: 'Error', detail: error.error.message || 'Error desconocido'});
        }
      );
    }
  }
}