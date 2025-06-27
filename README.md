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

## Autenticación con cookies

Al iniciar sesión, el backend emite dos cookies HTTP-only:

* `accessToken` – token de acceso con expiración corta.
* `refreshToken` – token para obtener un nuevo `accessToken` sin volver a ingresar credenciales.

Ambas cookies se crean con los atributos `HttpOnly` y `SameSite=Strict`, por lo que no son accesibles desde JavaScript. Para renovar la sesión se expone la ruta `POST /api/auth/refresh`, que devuelve un nuevo `accessToken` si el `refreshToken` es válido.

El frontend guarda únicamente la información pública del usuario en `localStorage` y envía las cookies automáticamente en cada petición gracias a la configuración `withCredentials` del interceptor HTTP.
