import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    PasswordModule,
    FormsModule,
    RouterModule,
    RippleModule,
    AppFloatingConfigurator,
    CommonModule,
  ],
  template: `
    <app-floating-configurator />
    <div
      class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden"
    >
      <div class="flex flex-col items-center justify-center">
        <img
          src="assets/layout/images/logo-bytte2x.png"
          alt="Logo"
          class="logo-image"
          width="100px"
        />

        <div
          style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)"
        >
          <div
            class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20"
            style="border-radius: 53px"
          >
            <div class="text-center mb-8">
              <div
                class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4"
              >
                CRM Bytte - Operaciones
              </div>
            </div>

            <div>
              <label
                for="email1"
                class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2"
                >Email</label
              >
              <input
                pInputText
                id="email1"
                type="text"
                placeholder="Ingrese su Correo"
                class="w-full md:w-[30rem] mb-8"
                [(ngModel)]="email"
              />

              <label
                for="password1"
                class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2"
                >Contraseña</label
              >
              <p-password
                id="password1"
                [(ngModel)]="password"
                placeholder="Ingrese su contraseña"
                [toggleMask]="true"
                styleClass="mb-4"
                [fluid]="true"
                [feedback]="false"
              ></p-password>

              <div class="flex items-center justify-between mt-2 mb-8 gap-8">
                <div class="flex items-center">
                  <p-checkbox
                    [(ngModel)]="checked"
                    id="rememberme1"
                    binary
                    class="mr-2"
                  ></p-checkbox>
                  <label for="rememberme1">Recordar</label>
                </div>
                <span
                  class="font-medium no-underline ml-2 text-right cursor-pointer text-primary"
                  >Olvidó Contraseña?</span
                >
              </div>
              <p-button
                label="Iniciar Sesión"
                styleClass="w-full"
                (onClick)="login()"
              ></p-button>

              <div *ngIf="errorMessage" class="text-red-600 mt-2 text-center">
                {{ errorMessage }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class Login {
  email: string = '';
  password: string = '';
  checked: boolean = false;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}
  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        //guardo en el storage la respuesta del login
        localStorage.setItem('token', response.token);

        //Redirecciono
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.errorMessage =
          err.error?.message ||
          'Credenciales incorrectas. Por favor, inténtelo de nuevo.';
      },
    });
  }
}
