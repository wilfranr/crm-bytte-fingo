import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { environment } from '../../../../environments/environment';

/**
 * @description Componente para el registro de nuevos usuarios.
 * Permite a los usuarios registrarse utilizando un token de invitación.
 */
@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    MessageModule,
    ToastModule,
    RouterModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  /**
   * @description Modelo de datos para el formulario de registro.
   */
  model = {
    token: '',
    name: '',
    email: '',
    password: '',
  };
  /**
   * @description Indicador de estado de registro en curso.
   */
  registering = false;
  /**
   * @description Mensaje de error a mostrar en caso de fallo en el registro.
   */
  errorMsg = '';
  /**
   * @description Mensaje de éxito a mostrar después de un registro exitoso.
   */
  successMsg = '';

  /**
   * @description Constructor del componente RegisterComponent.
   * @param http Cliente HTTP para realizar peticiones al backend.
   * @param router Servicio de enrutamiento de Angular para la navegación.
   * @param route Servicio para acceder a los parámetros de la ruta activada.
   */
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    // Si el token viene en la URL, lo precarga
    this.route.queryParams.subscribe((params) => {
      if (params['token']) {
        this.model.token = params['token'];
      }
    });
  }

  /**
   * @description Maneja el envío del formulario de registro.
   * Envía los datos del usuario al backend para su registro.
   */
  onSubmit() {
    this.errorMsg = '';
    this.successMsg = '';
    this.registering = true;

    this.http
      .post(`${environment.apiUrl}/auth/register`, this.model)
      .subscribe({
        next: () => {
          this.successMsg = '¡Usuario registrado! Ya puedes iniciar sesión.';
          setTimeout(() => this.router.navigate(['/auth/login']), 1800);
        },
        error: (err) => {
          this.errorMsg = err.error?.message || 'Error al registrar.';
        },
      })
      .add(() => (this.registering = false));
  }
}
