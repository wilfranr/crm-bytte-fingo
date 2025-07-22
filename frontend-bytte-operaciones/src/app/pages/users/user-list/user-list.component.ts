import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService, User } from '../../../core/services/user.service';
import { InviteService } from '../../../core/services/invite.service';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { Table, TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { DialogModule } from 'primeng/dialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthService } from '../../../core/services/auth.service';
import { ToolbarModule } from 'primeng/toolbar';
import { InputIconModule } from 'primeng/inputicon';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-user-list',
  imports: [
    ToastModule,
    ButtonModule,
    MessageModule,
    TableModule,
    IconFieldModule,
    DialogModule,
    ToolbarModule,
    InputIconModule,
    ConfirmDialogModule,
    CommonModule,
    FormsModule,
    DropdownModule,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
  userDialog = false;
  userEditDialog = false;
  users: User[] = [];
  user: User = { name: '', email: '', role: 'user' };
  selectedUsers: User[] = [];
  submitted = false;
  inviteToken: string | null = null;
  isAdmin = false;
  roles = [
    { name: 'Usuario', value: 'user' },
    { name: 'Administrador', value: 'admin' },
  ];

  @ViewChild('dt') dt!: Table;

  constructor(
    private userService: UserService,
    private inviteService: InviteService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.checkRole();
    this.loadUsers();
  }

  checkRole() {
    const info = this.authService.getUserInfo();
    this.isAdmin = info?.role === 'admin';
  }

  loadUsers(): void {
    this.userService.getAll().subscribe((data) => (this.users = data));
  }

  openNew(): void {
    this.user = { name: '', email: '', role: 'user' };
    this.submitted = false;
    this.userDialog = true;
  }
  editUser(user: User): void {
    this.user = { ...user };
    this.userEditDialog = true;
  }

  deleteUser(user: User): void {
    this.confirmationService.confirm({
      message: `¿Estás seguro de que deseas eliminar al usuario "${user.name}"?`,
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (user._id) {
          this.userService.delete(user._id).subscribe(() => {
            this.users = this.users.filter((val) => val._id !== user._id);
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Usuario eliminado',
              life: 3000,
            });
          });
        }
      },
    });
  }

  deleteSelectedUsers(): void {
    this.confirmationService.confirm({
      message: `¿Estás seguro de que deseas eliminar los usuarios seleccionados?`,
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.selectedUsers.forEach((user) => {
          if (user._id) {
            this.userService.delete(user._id).subscribe(() => {
              this.users = this.users.filter((val) => val._id !== user._id);
            });
          }
        });
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Usuarios eliminados',
          life: 3000,
        });
        this.selectedUsers = [];
      },
    });
  }

  saveUser(): void {
    this.submitted = true;

    if (this.user.name.trim() && this.user.email.trim()) {
      if (this.user._id) {
        this.userService.update(this.user._id, this.user).subscribe((data) => {
          const index = this.users.findIndex((val) => val._id === data._id);
          this.users[index] = data;
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Usuario actualizado',
            life: 3000,
          });
        });
      } else {
        this.userService.create(this.user).subscribe((data) => {
          this.users.push(data);
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Usuario creado',
            life: 3000,
          });
        });
      }

      this.userDialog = false;
      this.userEditDialog = false;
      this.user = { name: '', email: '', role: 'user' };
    }
  }

  hideDialog(): void {
    this.userDialog = false;
    this.userEditDialog = false;
    this.submitted = false;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  generateToken(): void {
    this.inviteService.generateToken().subscribe({
      next: (res) => {
        this.inviteToken = res.token;
        this.messageService.add({
          severity: 'info',
          summary: 'Token generado',
          detail: 'Copia y comparte este token con el usuario.',
          life: 5000,
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo generar el token',
        });
      },
    });
  }

  copyToken(): void {
    if (!this.inviteToken) return;
    navigator.clipboard.writeText(this.inviteToken).then(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Copiado',
        detail: 'Token copiado al portapapeles',
        life: 3000,
      });
    });
  }
}
