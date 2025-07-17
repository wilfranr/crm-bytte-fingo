# Backend Bytte Operaciones

Este directorio contiene el código del backend de la aplicación CRM Bytte Operaciones.

## Cambios Recientes

### Funcionalidad de Clientes

Se ha implementado la funcionalidad para obtener clientes desde Freshdesk. El endpoint `/api/clientes` utiliza la API de Freshdesk para buscar contactos con la etiqueta "Fingo". La autenticación se realiza mediante una clave API de Freshdesk codificada en Base64 (`API_KEY:X`).

### Migración a Módulos ES

Los archivos de rutas y controladores (`facturacion.routes.js` y `facturacion.controller.js`) han sido migrados a la sintaxis de Módulos ES (`import/export`) para una mejor compatibilidad y modernización del código. Esto incluye la actualización de las importaciones de módulos nativos de Node.js (como `path` y `fs`) y la gestión de `__dirname` en el ámbito de módulos ES.

### Funcionalidad de Procesamiento y Descarga de Archivos

El controlador `facturacion.controller.js` ahora maneja el procesamiento de archivos Excel y, al finalizar, envía el archivo consolidado directamente al cliente para su descarga. Esto se logra utilizando `res.download()` y asegurando que el archivo subido se limpie después de la operación.

## Configuración y Ejecución

Para configurar y ejecutar el backend, consulta el `README.md` principal en la raíz del proyecto para obtener instrucciones detalladas sobre las variables de entorno y los comandos de inicio.