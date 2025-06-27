import { Component, OnInit, ViewChild } from '@angular/core';
import { Accesos, AccesosService } from '../service/accesos.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { CommonModule } from '@angular/common';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-accesos',
  standalone: true,
  imports: [
    TableModule,
    ToolbarModule,
    ButtonModule,
    DialogModule,
    FormsModule,
    ConfirmDialogModule,
    InputTextModule,
    TooltipModule,
    CommonModule,
    MessageModule,
    ToastModule,
    IconFieldModule,
    InputIconModule,
    PasswordModule,
  ],
  providers: [ConfirmationService, MessageService, AccesosService],
  template: `
    <p-toast />
    <p-toolbar styleClass="mb-6">
      <ng-template #start>
        <p-button
          label="Nuevo"
          icon="pi pi-plus"
          severity="secondary"
          class="mr-2"
          (onClick)="openNew()"
        />
        <p-button
          severity="secondary"
          label="Eliminar"
          icon="pi pi-trash"
          outlined
          (onClick)="deleteSelectedAccesses()"
          [disabled]="!selectedAccesses || !selectedAccesses.length"
        />
      </ng-template>
    </p-toolbar>

    <p-table
      #dt
      [value]="accesses"
      [(selection)]="selectedAccesses"
      [paginator]="true"
      [rows]="10"
      [rowsPerPageOptions]="[5, 10, 20]"
      [tableStyle]="{ 'min-width': '75rem' }"
      [rowHover]="true"
      responsiveLayout="scroll"
      [globalFilterFields]="['portalName', 'url', 'username', 'password']"
      currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} accesos"
      [showCurrentPageReport]="true"
    >
      <ng-template #caption>
        <div class="flex items-center justify-between">
          <h5 class="m-0">Administrar Accesos</h5>
          <p-iconfield>
            <p-inputicon styleClass="pi pi-search" />
            <input
              pInputText
              type="text"
              (input)="onGlobalFilter(dt, $event)"
              placeholder="Search..."
            />
          </p-iconfield>
        </div>
      </ng-template>
      <ng-template pTemplate="header">
        <tr>
          <th style="width: 3rem">
            <p-tableHeaderCheckbox />
          </th>
          <th>Nombre del Portal</th>
          <th>URL</th>
          <th>Usuario</th>
          <th>Password</th>
          <th>Acciones</th>
        </tr>
      </ng-template>
      <ng-template pTemplate="body" let-access>
        <tr>
          <td style="width: 3rem">
            <p-tableCheckbox [value]="access" />
          </td>
          <td>{{ access.portalName }}</td>
          <td>
            <a [href]="access.url" target="_blank">
              <p-button
                label="{{ access.url }}"
                severity="info"
                text
                icon="pi pi-arrow-up-right"
                iconPos="right"
              />
            </a>
          </td>
          <td>
            {{ access.username }}
            <p-button
              icon="pi pi-copy"
              severity="info"
              (onClick)="copyToClipboard(access.username)"
              [rounded]="true"
              [outlined]="true"
              pTooltip="Copiar Usuario"
            ></p-button>
          </td>
          <td>
            <input
              type="password"
              [value]="access.password"
              readonly
              style="border: none; background: transparent; width: auto;"
            />
            <p-button
              icon="pi pi-copy"
              severity="info"
              rounded
              outlined
              (onClick)="copyToClipboard(access.password)"
              pTooltip="Copiar contraseña"
            ></p-button>
          </td>

          <td>
            <p-button
              icon="pi pi-pencil"
              class="mr-2"
              [rounded]="true"
              [outlined]="true"
              (click)="editAccess(access)"
            />
            <p-button
              icon="pi pi-trash"
              severity="danger"
              [rounded]="true"
              [outlined]="true"
              (click)="deleteAccess(access)"
            />
          </td>
        </tr>
      </ng-template>
    </p-table>

    <p-dialog
      [(visible)]="accessDialog"
      [style]="{ width: '450px' }"
      header="Detalles de Acceso"
      [modal]="true"
    >
      <ng-template #content>
        <div class="flex flex-col gap-6">
          <div>
            <label for="name" class="block font-bold mb-3"
              >Nombre del Portal</label
            >
            <input
              type="text"
              pInputText
              id="name"
              [(ngModel)]="access.portalName"
              required
              autofocus
              fluid
            />
            <small class="text-red-500" *ngIf="submitted && !access.portalName"
              >Name is required.</small
            >
          </div>
          <div>
            <label for="url" class="block font-bold mb-3">URL</label>
            <p-iconfield>
              <p-inputicon class="pi pi-globe" />
              <input
                type="text"
                pInputText
                id="url"
                [(ngModel)]="access.url"
                required
                autofocus
                fluid
              />
            </p-iconfield>
          </div>

          <div>
            <label for="username" class="block font-bold mb-3">Usuario</label>
            <p-iconfield>
              <p-inputicon class="pi pi-user" />
              <input
                type="text"
                pInputText
                id="username"
                [(ngModel)]="access.username"
                required
                autofocus
                fluid
              />
            </p-iconfield>
          </div>
          <div>
            <label for="password" class="block font-bold mb-3">Password</label>
            <p-password
              id="password"
              [(ngModel)]="access.password"
              placeholder="Password"
              [toggleMask]="true"
              styleClass="mb-4"
              [fluid]="true"
              [feedback]="false"
            ></p-password>
          </div>
        </div>
      </ng-template>

      <ng-template #footer>
        <p-button
          label="Cancelar"
          icon="pi pi-times"
          text
          (click)="hideDialog()"
        />
        <p-button label="Guardar" icon="pi pi-check" (click)="saveAccess()" />
      </ng-template>
    </p-dialog>

    <p-confirmdialog [style]="{ width: '450px' }" />
  `,
})
export class AccesosComponent implements OnInit {
  accessDialog: boolean = false;
  accesses: Accesos[] = [];
  access: Accesos = { portalName: '', url: '', username: '', password: '' };
  selectedAccesses: Accesos[] = [];
  submitted: boolean = false;

  @ViewChild('dt') dt!: Table;

  constructor(
    private accesosService: AccesosService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {}

  ngOnInit(): void {
    this.loadAccesses();
  }

  loadAccesses(): void {
    this.accesosService.getAll().subscribe((data) => {
      this.accesses = data;
    });
  }

  openNew(): void {
    this.access = { portalName: '', url: '', username: '', password: '' };
    this.submitted = false;
    this.accessDialog = true;
  }

  editAccess(access: Accesos): void {
    this.access = { ...access };
    this.accessDialog = true;
  }

  deleteAccess(access: Accesos): void {
    this.confirmationService.confirm({
      message: `¿Estás seguro de que deseas eliminar el portal "${access.portalName}"?`,
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (access._id) {
          this.accesosService.delete(access._id).subscribe(() => {
            this.accesses = this.accesses.filter(
              (val) => val._id !== access._id,
            );
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Acceso eliminado',
              life: 3000,
            });
          });
        }
      },
    });
  }

  deleteSelectedAccesses(): void {
    this.confirmationService.confirm({
      message: `¿Estás seguro de que deseas eliminar los accesos seleccionados?`,
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.selectedAccesses.forEach((access) => {
          if (access._id) {
            this.accesosService.delete(access._id).subscribe(() => {
              this.accesses = this.accesses.filter(
                (val) => val._id !== access._id,
              );
            });
          }
        });
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Accesos eliminados',
          life: 3000,
        });
        this.selectedAccesses = [];
      },
    });
  }

  saveAccess(): void {
    this.submitted = true;

    if (this.access.portalName.trim()) {
      if (this.access._id) {
        this.accesosService
          .update(this.access._id, this.access)
          .subscribe((data) => {
            const index = this.accesses.findIndex(
              (val) => val._id === data._id,
            );
            this.accesses[index] = data;
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Acceso actualizado',
              life: 3000,
            });
          });
      } else {
        this.accesosService.create(this.access).subscribe((data) => {
          this.accesses.push(data);
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Acceso creado',
            life: 3000,
          });
        });
      }

      this.accessDialog = false;
      this.access = { portalName: '', url: '', username: '', password: '' };
    }
  }

  hideDialog(): void {
    this.accessDialog = false;
    this.submitted = false;
  }
  copyToClipboard(value: string): void {
    navigator.clipboard.writeText(value).then(
      () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Info',
          detail: 'Texto Copiado',
        });
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo copiar el texto.',
        });
      },
    );
  }
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
