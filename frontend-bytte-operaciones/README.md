# FrontendBytteOperaciones

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.7.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## API endpoint

The base URL of the backend API is defined in `src/environments/environment.ts` and `src/environments/environment.prod.ts`. Update these files if your backend runs on a different host or port.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Mejoras en la Interfaz de Usuario y Funcionalidades

Se han implementado mejoras significativas en la interfaz de usuario y se han añadido nuevas funcionalidades:

### Funcionalidad de Clientes

El componente `ClientesComponent` (`src/app/pages/clientes/clientes.component.ts`) muestra una tabla con la información de los clientes obtenida del backend. Incluye las siguientes características:

-   **Visualización de Clientes:** Muestra una lista de clientes con detalles como nombre, email, teléfono, empresa e ID de formulario.
-   **Conteo de Clientes:** Una tarjeta en la parte superior de la página muestra el número total de clientes activos.
-   **Copiar al Portapapeles:** Al hacer doble clic en cualquier celda de la tabla, su contenido se copia automáticamente al portapapeles, con una notificación visual de éxito o error.
-   **Búsqueda y Filtrado Global:** Se ha añadido un campo de búsqueda global en el encabezado de la tabla que permite filtrar los clientes por nombre, email, teléfono, nombre de la empresa e ID de formulario. También se incluye un botón para limpiar el filtro.
-   **Logo de Fingo:** El logo de Fingo se muestra en el encabezado de la tabla de clientes para una mejor identificación visual.

### Componente de Carga de Archivos (p-fileupload):** Se ha integrado el componente `p-fileupload` de PrimeNG para una experiencia de carga de archivos más robusta y visualmente atractiva. Permite seleccionar archivos Excel (`.xlsx`, `.xls`) para su procesamiento.
- **Indicador de Progreso:** Durante el procesamiento del archivo, se muestra una barra de progreso (`p-progressbar`) para indicar el estado de la operación.
- **Botón de Descarga de Reporte MIID:** Se ha añadido un botón que permite descargar directamente un reporte desde la plataforma MIID. La URL de este reporte se construye dinámicamente con las fechas del primer día del mes anterior al primer día del mes actual, facilitando la obtención de datos relevantes.
- **Diseño y Distribución:** Se ha mejorado la distribución general de los elementos en la interfaz, utilizando clases de PrimeFlex para un diseño más limpio y organizado.