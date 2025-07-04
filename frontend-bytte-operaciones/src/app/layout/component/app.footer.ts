import { Component } from '@angular/core';

/**
 * @description Componente del pie de página de la aplicación.
 * Muestra el logo y el nombre de la empresa.
 */
@Component({
    standalone: true,
    selector: 'app-footer',
    template: `<div class="layout-footer">
        <img src="assets/layout/images/logo-bytte2x.png" alt="Logo" class="logo-image" width="30px"/>
        BYTTE
    </div>`
})
export class AppFooter {}
