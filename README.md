# CRM Bytte Operaciones

Este proyecto contiene un backend en Node.js y un frontend en Angular.

## Variables de entorno

El backend utiliza la biblioteca [`dotenv`](https://github.com/motdotla/dotenv) para cargar variables de entorno desde un archivo `.env` ubicado en la carpeta `backend-bytte-operaciones`.

1. Copia el archivo `.env.example` y renómbralo a `.env`:
   
   ```bash
   cp backend-bytte-operaciones/.env.example backend-bytte-operaciones/.env
   ```

2. Actualiza los valores de `MONGODB_URI` y `SECRET_KEY` según tu configuración.

El valor `MONGODB_URI` debe contener la cadena de conexión de MongoDB, por ejemplo:

```
MONGODB_URI=mongodb+srv://usuario:contraseña@host/tu-base?retryWrites=true&w=majority&appName=ClusterBytte
```

Una vez configurado el archivo `.env`, instala las dependencias y arranca el backend con:

```bash
npm install --prefix backend-bytte-operaciones
npm --prefix backend-bytte-operaciones start
```

El frontend se encuentra en la carpeta `frontend-bytte-operaciones` y puede iniciarse con:

```bash
npm install --prefix frontend-bytte-operaciones
npm --prefix frontend-bytte-operaciones start
```

La URL base del API se configura en `frontend-bytte-operaciones/src/environments/environment.ts`.

Si prefieres ejecutar backend y frontend al mismo tiempo, instala las dependencias en la raíz y usa:

```bash
npm install
npm start
```

Esto ejecutará los dos proyectos de manera concurrente.

## Autenticación con cookies y Refresco Automático

Al iniciar sesión, el backend emite dos cookies HTTP-only:

* `accessToken` – token de acceso con expiración corta (15 minutos).
* `refreshToken` – token para obtener un nuevo `accessToken` sin volver a ingresar credenciales (7 días).

Ambas cookies se crean con los atributos `HttpOnly` y `SameSite=Strict`, por lo que no son accesibles desde JavaScript.

El frontend implementa un `HttpInterceptor` que se encarga de la renovación automática de la sesión. Cuando el `accessToken` expira y el backend devuelve un error `401 Unauthorized`, el interceptor utiliza el `refreshToken` para solicitar un nuevo `accessToken` de forma silenciosa a través de la ruta `POST /api/auth/refresh`.

Si el refresco es exitoso, la petición original se reintenta sin que el usuario lo note. Si el `refreshToken` también ha expirado, el interceptor redirigirá automáticamente al usuario a la página de inicio de sesión.
