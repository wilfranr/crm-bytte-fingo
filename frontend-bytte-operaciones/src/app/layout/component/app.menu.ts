import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

/**
 * @description Componente del menú principal de la aplicación.
 * Renderiza los elementos del menú y sus submenús.
 */
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, AppMenuitem, RouterModule],
  template: `<ul class="layout-menu">
    <ng-container *ngFor="let item of model; let i = index">
      <li
        app-menuitem
        *ngIf="!item.separator"
        [item]="item"
        [index]="i"
        [root]="true"
      ></li>
      <li *ngIf="item.separator" class="menu-separator"></li>
    </ng-container>
  </ul> `,
})
export class AppMenu {
  /**
   * @description Modelo de datos para los elementos del menú.
   */
  model: MenuItem[] = [];

  /**
   * @description Hook del ciclo de vida de Angular que se ejecuta después de que el componente ha sido inicializado.
   * Inicializa el modelo del menú con las opciones de navegación de la aplicación.
   */
  ngOnInit() {
    this.model = [
      {
        label: 'Home',
        items: [
          // { label: 'Dashboard', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/'] },
          {
            label: 'Cortes',
            icon: 'pi pi-fw pi-chart-line',
            routerLink: ['/cortes'],
          },
          {
            label: 'Accesos',
            icon: 'pi pi-fw pi-key',
            routerLink: ['/accesos'],
          },
        ],
      },
      {
        label: 'Fingo',
        items: [
          {
            label: 'Clientes',
            icon: 'pi pi-fw pi-users',
            routerLink: ['/clientes'],
          },
        ],
      },
      {
        label: 'Itaú',
        items: [
          {
            label: 'Facturación-CASB',
            icon: 'pi pi-fw pi-dollar',
            routerLink: ['/facturacion-casb'],
          },

          {
            label: 'Facturación MIID',
            icon: 'pi pi-fw pi-dollar',
            routerLink: ['/facturacion-miid'],
          },

          // { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout'] },
          // { label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input'] },
          // { label: 'Button', icon: 'pi pi-fw pi-mobile', class: 'rotated-icon', routerLink: ['/uikit/button'] },
          // { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table'] },
          // { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list'] },
          // { label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/uikit/tree'] },
          // { label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/uikit/panel'] },
          // { label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/uikit/overlay'] },
          // { label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/uikit/media'] },
          // { label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'] },
          // { label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/uikit/message'] },
          // { label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/file'] },
          // { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts'] },
          // { label: 'Timeline', icon: 'pi pi-fw pi-calendar', routerLink: ['/uikit/timeline'] },
          // { label: 'Misc', icon: 'pi pi-fw pi-circle', routerLink: ['/uikit/misc'] }
        ],
      },
      {
        label: 'Davivienda',
        items: [
          {
            label: 'Reporte de Información',
            icon: 'pi pi-fw pi-file',
            routerLink: ['/davivienda/reporte-informacion'],
          },
        ],
      },
      {
        label: 'Antel',
        items: [
          {
            label: 'Revisión de logs',
            icon: 'pi pi-fw pi-file',
            routerLink: ['/antel/logs'],
          },
        ],
      },
      {
        label: 'Administración',
        items: [
          {
            label: 'Usuarios',
            icon: 'pi pi-fw pi-users',
            routerLink: ['/users'],
          },
        ],
      },
    ];
  }
}
