import { Component, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { AppTopbar } from './app.topbar';
import { AppSidebar } from './app.sidebar';
import { AppFooter } from './app.footer';
import { LayoutService } from '../service/layout.service';

/**
 * @description Componente principal del layout de la aplicación.
 * Gestiona la estructura general de la interfaz de usuario, incluyendo la barra superior, la barra lateral y el pie de página.
 * También maneja la lógica de interacción del menú y el scroll del cuerpo.
 */
@Component({
    selector: 'app-layout',
    standalone: true,
    imports: [CommonModule, AppTopbar, AppSidebar, RouterModule, AppFooter],
    template: `<div class="layout-wrapper" [ngClass]="containerClass">
        <app-topbar></app-topbar>
        <app-sidebar></app-sidebar>
        <div class="layout-main-container">
            <div class="layout-main">
                <router-outlet></router-outlet>
            </div>
            <app-footer></app-footer>
        </div>
        <div class="layout-mask animate-fadein"></div>
    </div> `
})
export class AppLayout {
    /**
     * @description Suscripción al evento de apertura del menú overlay.
     */
    overlayMenuOpenSubscription: Subscription;

    /**
     * @description Listener para detectar clics fuera del menú.
     */
    menuOutsideClickListener: any;

    /**
     * @description Referencia al componente AppSidebar.
     */
    @ViewChild(AppSidebar) appSidebar!: AppSidebar;

    /**
     * @description Referencia al componente AppTopbar.
     */
    @ViewChild(AppTopbar) appTopBar!: AppTopbar;

    /**
     * @description Constructor del componente AppLayout.
     * @param layoutService Servicio para gestionar el estado del layout.
     * @param renderer Servicio para manipular el DOM.
     * @param router Servicio de enrutamiento de Angular.
     */
    constructor(
        public layoutService: LayoutService,
        public renderer: Renderer2,
        public router: Router
    ) {
        this.overlayMenuOpenSubscription = this.layoutService.overlayOpen$.subscribe(() => {
            if (!this.menuOutsideClickListener) {
                this.menuOutsideClickListener = this.renderer.listen('document', 'click', (event) => {
                    if (this.isOutsideClicked(event)) {
                        this.hideMenu();
                    }
                });
            }

            if (this.layoutService.layoutState().staticMenuMobileActive) {
                this.blockBodyScroll();
            }
        });

        this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
            this.hideMenu();
        });
    }

    /**
     * @description Verifica si el clic del ratón ocurrió fuera del menú lateral o la barra superior.
     * @param event El evento del clic del ratón.
     * @returns `true` si el clic fue fuera de los elementos del menú, `false` en caso contrario.
     */
    isOutsideClicked(event: MouseEvent) {
        const sidebarEl = document.querySelector('.layout-sidebar');
        const topbarEl = document.querySelector('.layout-menu-button');
        const eventTarget = event.target as Node;

        return !(sidebarEl?.isSameNode(eventTarget) || sidebarEl?.contains(eventTarget) || topbarEl?.isSameNode(eventTarget) || topbarEl?.contains(eventTarget));
    }

    /**
     * @description Oculta el menú lateral y desactiva el listener de clics externos.
     */
    hideMenu() {
        this.layoutService.layoutState.update((prev) => ({ ...prev, overlayMenuActive: false, staticMenuMobileActive: false, menuHoverActive: false }));
        if (this.menuOutsideClickListener) {
            this.menuOutsideClickListener();
            this.menuOutsideClickListener = null;
        }
        this.unblockBodyScroll();
    }

    /**
     * @description Bloquea el scroll del cuerpo de la página.
     */
    blockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.add('blocked-scroll');
        } else {
            document.body.className += ' blocked-scroll';
        }
    }

    /**
     * @description Desbloquea el scroll del cuerpo de la página.
     */
    unblockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.remove('blocked-scroll');
        } else {
            document.body.className = document.body.className.replace(new RegExp('(^|\\b)' + 'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }

    /**
     * @description Obtiene las clases CSS dinámicas para el contenedor principal del layout.
     * @returns Un objeto con las clases CSS a aplicar.
     */
    get containerClass() {
        return {
            'layout-overlay': this.layoutService.layoutConfig().menuMode === 'overlay',
            'layout-static': this.layoutService.layoutConfig().menuMode === 'static',
            'layout-static-inactive': this.layoutService.layoutState().staticMenuDesktopInactive && this.layoutService.layoutConfig().menuMode === 'static',
            'layout-overlay-active': this.layoutService.layoutState().overlayMenuActive,
            'layout-mobile-active': this.layoutService.layoutState().staticMenuMobileActive
        };
    }

    /**
     * @description Hook del ciclo de vida de Angular que se ejecuta cuando el componente es destruido.
     * Limpia las suscripciones y listeners para evitar fugas de memoria.
     */
    ngOnDestroy() {
        if (this.overlayMenuOpenSubscription) {
            this.overlayMenuOpenSubscription.unsubscribe();
        }

        if (this.menuOutsideClickListener) {
            this.menuOutsideClickListener();
        }
    }
}
