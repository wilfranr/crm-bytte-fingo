import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { LayoutService } from '../service/layout.service';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { AppConfigurator } from './app.configurator';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [RouterModule, CommonModule, StyleClassModule, AppConfigurator],
  template: ` <div class="layout-topbar">
    <div class="layout-topbar-logo-container">
      <button
        class="layout-menu-button layout-topbar-action"
        (click)="layoutService.onMenuToggle()"
      >
        <i class="pi pi-bars"></i>
      </button>
      <a class="layout-topbar-logo" routerLink="/">
        <img
          src="assets/layout/images/logo-bytte2x.png"
          alt="Logo"
          class="logo-image"
          width="30px"
        />
        <span>Operaciones</span>
      </a>
    </div>

    <div class="layout-topbar-actions">
      <div class="layout-config-menu">
        <button
          type="button"
          class="layout-topbar-action"
          (click)="toggleDarkMode()"
        >
          <i
            [ngClass]="{
              'pi ': true,
              'pi-moon': layoutService.isDarkTheme(),
              'pi-sun': !layoutService.isDarkTheme(),
            }"
          ></i>
        </button>
        <div class="relative">
          <button
            class="layout-topbar-action layout-topbar-action-highlight"
            pStyleClass="@next"
            enterFromClass="hidden"
            enterActiveClass="animate-scalein"
            leaveToClass="hidden"
            leaveActiveClass="animate-fadeout"
            [hideOnOutsideClick]="true"
          >
            <i class="pi pi-palette"></i>
          </button>
          <app-configurator />
        </div>
      </div>

      <button
        class="layout-topbar-menu-button layout-topbar-action"
        pStyleClass="@next"
        enterFromClass="hidden"
        enterActiveClass="animate-scalein"
        leaveToClass="hidden"
        leaveActiveClass="animate-fadeout"
        [hideOnOutsideClick]="true"
      >
        <i class="pi pi-ellipsis-v"></i>
      </button>

      <div class="layout-topbar-menu hidden lg:block">
        <div class="layout-topbar-menu-content">
          <button type="button" class="layout-topbar-action">
            <i class="pi pi-calendar"></i>
            <span>Calendar</span>
          </button>
          <div class="relative">
            <button
              class="layout-topbar-action"
              pStyleClass="@next"
              enterFromClass="hidden"
              enterActiveClass="animate-scalein"
              leaveToClass="hidden"
              leaveActiveClass="animate-fadeout"
              [hideOnOutsideClick]="true"
            >
              <i class="pi pi-user"></i>
              <span class="ml-2">Perfil</span>
            </button>

            <!-- Dropdown personalizado -->
            <div
              class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow z-50 hidden"
            >
              <div class="py-2">
                <p class="px-4 py-2 text-gray-700 dark:text-gray-200">
                  {{ userName }}
                </p>
                <hr class="border-gray-200 dark:border-gray-700" />
              </div>
              <button
                class="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                (click)="logout()"
              >
                <i class="pi pi-sign-out mr-2"></i> Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`,
})
export class AppTopbar {
  items!: MenuItem[];
  userName: string | null = null;

  constructor(
    public layoutService: LayoutService,
    private router: Router,
  ) {}

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
  ngOnInit(): void {
    const savedTheme = localStorage.getItem('darkMode');

    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      this.userName = decoded.name || decoded.email || 'Usuario';
    }
    if (savedTheme !== null) {
      this.layoutService.layoutConfig.update((state) => ({
        ...state,
        darkTheme: JSON.parse(savedTheme),
      }));
    }
  }

  logout() {
    localStorage.removeItem('token');
    //redirect to login page
    this.router.navigate(['/auth/login']);
  }
}
