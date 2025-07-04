import { Injectable, effect, signal, computed } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * @description Interfaz que define la estructura de la configuración del layout de la aplicación.
 */
export interface layoutConfig {
  preset?: string;
  primary?: string;
  surface?: string | undefined | null;
  darkTheme?: boolean;
  menuMode?: string;
}

/**
 * @description Interfaz que define el estado actual del layout de la aplicación.
 */
interface LayoutState {
  staticMenuDesktopInactive?: boolean;
  overlayMenuActive?: boolean;
  configSidebarVisible?: boolean;
  staticMenuMobileActive?: boolean;
  menuHoverActive?: boolean;
}

/**
 * @description Interfaz que define el evento de cambio de menú.
 */
interface MenuChangeEvent {
  key: string;
  routeEvent?: boolean;
}

/**
 * @description Servicio para gestionar el estado y la configuración del layout de la aplicación.
 * Proporciona señales y observables para que los componentes puedan reaccionar a los cambios en el layout.
 */
@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  /**
   * @description Configuración inicial del layout.
   */
  _config: layoutConfig = {
    preset: 'Aura',
    primary: 'orange',
    surface: null,
    darkTheme: false,
    menuMode: 'static',
  };

  /**
   * @description Estado inicial del layout.
   */
  _state: LayoutState = {
    staticMenuDesktopInactive: false,
    overlayMenuActive: false,
    configSidebarVisible: false,
    staticMenuMobileActive: false,
    menuHoverActive: false,
  };

  /**
   * @description Señal que contiene la configuración actual del layout.
   */
  layoutConfig = signal<layoutConfig>(this._config);

  /**
   * @description Señal que contiene el estado actual del layout.
   */
  layoutState = signal<LayoutState>(this._state);

  /**
   * @description Sujeto para notificar actualizaciones en la configuración del layout.
   */
  private configUpdate = new Subject<layoutConfig>();

  /**
   * @description Sujeto para notificar la apertura de un menú overlay.
   */
  private overlayOpen = new Subject<any>();

  /**
   * @description Sujeto para notificar cambios en el estado del menú.
   */
  private menuSource = new Subject<MenuChangeEvent>();

  /**
   * @description Sujeto para notificar un reinicio del menú.
   */
  private resetSource = new Subject();

  /**
   * @description Observable para los eventos de la fuente del menú.
   */
  menuSource$ = this.menuSource.asObservable();

  /**
   * @description Observable para los eventos de reinicio del menú.
   */
  resetSource$ = this.resetSource.asObservable();

  /**
   * @description Observable para las actualizaciones de la configuración del layout.
   */
  configUpdate$ = this.configUpdate.asObservable();

  /**
   * @description Observable para los eventos de apertura del menú overlay.
   */
  overlayOpen$ = this.overlayOpen.asObservable();

  /**
   * @description Tema actual de la aplicación (claro u oscuro).
   */
  theme = computed(() => (this.layoutConfig()?.darkTheme ? 'light' : 'dark'));

  /**
   * @description Indica si la barra lateral está activa (visible).
   */
  isSidebarActive = computed(
    () =>
      this.layoutState().overlayMenuActive ||
      this.layoutState().staticMenuMobileActive,
  );

  /**
   * @description Indica si el tema oscuro está activo.
   */
  isDarkTheme = computed(() => this.layoutConfig().darkTheme);

  /**
   * @description Color primario actual.
   */
  getPrimary = computed(() => this.layoutConfig().primary);

  /**
   * @description Color de superficie actual.
   */
  getSurface = computed(() => this.layoutConfig().surface);

  /**
   * @description Indica si el modo de menú es 'overlay'.
   */
  isOverlay = computed(() => this.layoutConfig().menuMode === 'overlay');

  /**
   * @description Señal que indica si la transición de vista ha completado.
   */
  transitionComplete = signal<boolean>(false);

  private initialized = false;

  /**
   * @description Constructor del servicio LayoutService.
   * Configura efectos para reaccionar a cambios en la configuración del layout y el tema oscuro.
   */
  constructor() {
    effect(() => {
      const config = this.layoutConfig();
      if (config) {
        this.onConfigUpdate();
      }
    });

    effect(() => {
      const config = this.layoutConfig();

      if (!this.initialized || !config) {
        this.initialized = true;
        return;
      }

      this.handleDarkModeTransition(config);
    });
  }

  /**
   * @description Maneja la transición del modo oscuro, utilizando la API View Transitions si está disponible.
   * @param config La configuración actual del layout.
   */
  private handleDarkModeTransition(config: layoutConfig): void {
    if ((document as any).startViewTransition) {
      this.startViewTransition(config);
    } else {
      this.toggleDarkMode(config);
      this.onTransitionEnd();
    }
  }

  /**
   * @description Inicia una transición de vista para el cambio de modo oscuro.
   * @param config La configuración actual del layout.
   */
  private startViewTransition(config: layoutConfig): void {
    const transition = (document as any).startViewTransition(() => {
      this.toggleDarkMode(config);
    });

    transition.ready
      .then(() => {
        this.onTransitionEnd();
      })
      .catch(() => {});
  }

  /**
   * @description Alterna la clase 'app-dark' en el elemento `<html>` para aplicar el tema oscuro/claro.
   * @param config La configuración del layout que indica si el tema oscuro está activo.
   */
  toggleDarkMode(config?: layoutConfig): void {
    const _config = config || this.layoutConfig();
    if (_config.darkTheme) {
      document.documentElement.classList.add('app-dark');
    } else {
      document.documentElement.classList.remove('app-dark');
    }
  }

  /**
   * @description Finaliza la transición de vista y restablece el estado de `transitionComplete`.
   */
  private onTransitionEnd() {
    this.transitionComplete.set(true);
    setTimeout(() => {
      this.transitionComplete.set(false);
    });
  }

  /**
   * @description Alterna el estado del menú lateral (estático o overlay) y el menú móvil.
   */
  onMenuToggle() {
    if (this.isOverlay()) {
      this.layoutState.update((prev) => ({
        ...prev,
        overlayMenuActive: !this.layoutState().overlayMenuActive,
      }));

      if (this.layoutState().overlayMenuActive) {
        this.overlayOpen.next(null);
      }
    }

    if (this.isDesktop()) {
      this.layoutState.update((prev) => ({
        ...prev,
        staticMenuDesktopInactive:
          !this.layoutState().staticMenuDesktopInactive,
      }));
    } else {
      this.layoutState.update((prev) => ({
        ...prev,
        staticMenuMobileActive: !this.layoutState().staticMenuMobileActive,
      }));

      if (this.layoutState().staticMenuMobileActive) {
        this.overlayOpen.next(null);
      }
    }
  }

  /**
   * @description Verifica si la pantalla es lo suficientemente grande para el modo de escritorio.
   * @returns `true` si el ancho de la ventana es mayor a 991px, `false` en caso contrario.
   */
  isDesktop() {
    return window.innerWidth > 991;
  }

  /**
   * @description Verifica si la pantalla es lo suficientemente pequeña para el modo móvil.
   * @returns `true` si el ancho de la ventana es menor o igual a 991px, `false` en caso contrario.
   */
  isMobile() {
    return !this.isDesktop();
  }

  /**
   * @description Notifica a los suscriptores que la configuración del layout ha sido actualizada.
   */
  onConfigUpdate() {
    this._config = { ...this.layoutConfig() };
    this.configUpdate.next(this.layoutConfig());
  }

  /**
   * @description Notifica a los suscriptores sobre un cambio en el estado del menú.
   * @param event El evento de cambio de menú.
   */
  onMenuStateChange(event: MenuChangeEvent) {
    this.menuSource.next(event);
  }

  /**
   * @description Reinicia el estado del menú.
   */
  reset() {
    this.resetSource.next(true);
  }
}
