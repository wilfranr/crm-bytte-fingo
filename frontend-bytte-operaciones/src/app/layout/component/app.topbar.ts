import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StyleClassModule } from 'primeng/styleclass';
import { CalendarModule } from 'primeng/calendar';
import { LayoutService } from '../service/layout.service';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { AppConfigurator } from './app.configurator';
import { AuthService } from '../../core/services/auth.service';

/**
 * @description Componente de la barra superior de la aplicación.
 * Contiene el logo, el botón de menú, el selector de tema y las opciones de usuario.
 */
@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [RouterModule, CommonModule, StyleClassModule, AppConfigurator, CalendarModule, FormsModule],
  templateUrl: './app.topbar.html',
  styleUrls: ['./app.topbar.scss']
})
export class AppTopbar {
  /**
   * @description Elementos del menú de la barra superior.
   */
  items!: MenuItem[];
  /**
   * @description Nombre del usuario actual, mostrado en el perfil.
   */
  userName: string | null = null;
  /**
   * @description Fecha seleccionada en el calendario.
   */
  selectedDate: Date | null = null;

  /**
   * @description Constructor del componente AppTopbar.
   * @param layoutService Servicio para gestionar el estado del layout.
   * @param router Servicio de enrutamiento de Angular.
   * @param authservice Servicio de autenticación para gestionar el login/logout.
   */
  constructor(
    public layoutService: LayoutService,
    private router: Router,
    private authservice: AuthService,
  ) {}

  /**
   * @description Alterna entre el modo oscuro y claro del tema de la aplicación.
   * Guarda la preferencia en el localStorage.
   */
  toggleDarkMode(): void {
    this.layoutService.layoutConfig.update((state) => {
      const newDarkModeState = !state.darkTheme;

      // Guardar preferencia en localStorage
      localStorage.setItem('darkMode', JSON.stringify(newDarkModeState));

      return {
        ...state,
        darkTheme: newDarkModeState,
      };
    });
  }

  /**
   * @description Hook del ciclo de vida de Angular que se ejecuta después de que el componente ha sido inicializado.
   * Carga la preferencia de tema oscuro desde localStorage y obtiene la información del usuario.
   */
  ngOnInit(): void {
    const savedTheme = localStorage.getItem('darkMode');

    const userInfo = this.authservice.getUserInfo();
    if (userInfo) {
      this.userName = userInfo.name || userInfo.email || 'Usuario';
    }

    if (savedTheme !== null) {
      this.layoutService.layoutConfig.update((state) => ({
        ...state,
        darkTheme: JSON.parse(savedTheme),
      }));
    }
  }

  /**
   * @description Cierra la sesión del usuario y redirige a la página de login.
   */
  logout() {
    this.authservice.logout().subscribe({
      next: () => this.router.navigate(['/auth/login']),
      error: () => this.router.navigate(['/auth/login']),
    });
  }
}
