import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { AppFloatingConfigurator } from '../../../layout/component/app.floatingconfigurator';

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
              <form (ngSubmit)="login()" #loginForm="ngForm">
                <label
                  for="email1"
                  class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2"
                  >Email</label
                >
                <input
                  pInputText
                  id="email1"
                  name="email"
                  type="text"
                  placeholder="Ingrese su Correo"
                  class="w-full md:w-[30rem] mb-8"
                  [(ngModel)]="email"
                  required
                />

                <label
                  for="password1"
                  class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2"
                  >Contraseña</label
                >
                <p-password
                  id="password1"
                  name="password"
                  [(ngModel)]="password"
                  placeholder="Ingrese su contraseña"
                  [toggleMask]="true"
                  styleClass="mb-4"
                  [fluid]="true"
                  [feedback]="false"
                  required
                ></p-password>

                <div class="flex items-center justify-between mt-2 mb-8 gap-8">
                  <div class="flex items-center">
                    <p-checkbox
                      [(ngModel)]="checked"
                      name="rememberme"
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

                <div>
                  <p-button
                    type="submit"
                    label="Iniciar Sesión"
                    styleClass="w-full"
                  ></p-button>
                </div>

                <div>
                  <p-button
                    label="Registrarse"
                    styleClass="w-full mt-4"
                    outlined
                    [routerLink]="['/auth/register']"
                  ></p-button>
                </div>

                <div *ngIf="errorMessage" class="text-red-600 mt-2 text-center">
                  {{ errorMessage }}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class LoginComponent {
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
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.errorMessage =
          err.error?.message ||
          'Credenciales incorrectas. Por favor, inténtelo de nuevo.';
      },
    });
  }

  register() {}
}
