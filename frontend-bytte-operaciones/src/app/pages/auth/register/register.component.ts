import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';

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
  model = {
    token: '',
    name: '',
    email: '',
    password: '',
  };
  registering = false;
  errorMsg = '';
  successMsg = '';

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

  onSubmit() {
    this.errorMsg = '';
    this.successMsg = '';
    this.registering = true;

    this.http
      .post('http://localhost:3000/api/auth/register', this.model)
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
