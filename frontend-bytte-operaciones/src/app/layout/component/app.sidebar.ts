import { Component, ElementRef } from '@angular/core';
import { AppMenu } from './app.menu';

/**
 * @description Componente de la barra lateral de la aplicación.
 * Contiene el menú principal de navegación.
 */
@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [AppMenu],
    template: ` <div class="layout-sidebar">
        <app-menu></app-menu>
    </div>`
})
export class AppSidebar {
    /**
     * @description Constructor del componente AppSidebar.
     * @param el Referencia al elemento DOM del componente.
     */
    constructor(public el: ElementRef) {}
}
