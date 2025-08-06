import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
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
import { DropdownModule } from 'primeng/dropdown';
import { ClienteService } from '../../../services/cliente.service';
import { LocationService } from '../../../services/location.service';

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
    InputIconModule,
    DropdownModule,
  ],
  providers: [MessageService],
  templateUrl: './edit-cliente.component.html',
  styleUrls: ['./edit-cliente.component.scss'],
})
export class EditClienteComponent implements OnInit {
  editForm: FormGroup;
  clienteId: string | null = null;
  departments: any[] = [];
  cities: any[] = [];

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private locationService: LocationService,
    private route: ActivatedRoute,
    private messageService: MessageService,
  ) {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: [''],
      direccion: [''],
      pais: [{ value: 'Colombia', disabled: true }],
      departamento: ['', Validators.required],
      ciudad: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.clienteId = this.route.snapshot.paramMap.get('id');

    this.locationService.getDepartments().subscribe((departments) => {
      this.departments = departments;

      if (this.clienteId) {
        this.clienteService.getClienteById(this.clienteId).subscribe({
          next: (cliente) => {
            console.log('Cliente data from service:', cliente); // Debugging line

            // Encuentra el ID del departamento basado en el nombre
            const foundDepartment = this.departments.find(
              (dep) => dep.departamento === cliente.departamento,
            );
            if (foundDepartment) {
              cliente.departamento = foundDepartment.id; // Asigna el ID para el patch
            }
            this.editForm.patchValue(cliente);
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo cargar el cliente.',
            });
          },
        });
      }
    });

    this.editForm
      .get('departamento')
      ?.valueChanges.subscribe((departmentId) => {
        if (departmentId) {
          this.locationService.getCities(departmentId).subscribe((cities) => {
            this.cities = cities;
          });
        }
      });
  }

  onSubmit(): void {
    if (this.editForm.invalid || !this.clienteId) {
      return;
    }

    const updatedData = this.editForm.getRawValue();

    this.clienteService.updateCliente(this.clienteId, updatedData).subscribe({
      next: (clienteActualizado) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: `Cliente "${clienteActualizado.name}" actualizado.`,
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo actualizar el cliente.',
        });
      },
    });
  }
}
