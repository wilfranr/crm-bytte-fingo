import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from '../../../core/models/cliente.model';

@Component({
  selector: 'app-edit-cliente',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToastModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    FloatLabelModule,
    IconFieldModule,
    InputIconModule
  ],
  providers: [MessageService],
  templateUrl: './edit-cliente.component.html',
  styleUrls: ['./edit-cliente.component.scss']
})
export class EditClienteComponent implements OnInit {
  editForm: FormGroup;
  clienteId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['']
    });
  }

  ngOnInit(): void {
    this.clienteId = this.route.snapshot.paramMap.get('id');
    if (this.clienteId) {
      this.clienteService.getClienteById(this.clienteId).subscribe({
        next: (cliente) => {
          this.editForm.patchValue(cliente);
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo cargar el cliente.' });
        }
      });
    }
  }

  onSubmit(): void {
    if (this.editForm.invalid || !this.clienteId) {
      return;
    }

    const updatedData = this.editForm.value;

    this.clienteService.updateCliente(this.clienteId, updatedData).subscribe({
      next: (clienteActualizado) => {
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: `Cliente "${clienteActualizado.name}" actualizado.` });
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar el cliente.' });
      }
    });
  }
}