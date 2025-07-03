import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Metadata de la API para Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CRM Bytte Operaciones API',
      version: '1.0.0',
      description:
        'Documentación oficial de la API para el CRM de Bytte Operaciones. Aquí encontrarás todos los endpoints disponibles.',
    },
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'accessToken', // o el nombre de tu cookie de sesión
        },
      },
    },
    security: [
      {
        cookieAuth: [],
      },
    ],
  },
  // Rutas a los archivos que contienen las anotaciones de la API
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

/**
 * Función para configurar la documentación de Swagger en la app de Express.
 * @param {object} app - La instancia de la aplicación de Express.
 * @param {number} port - El puerto donde se ejecuta el servidor.
 */
export const setupSwaggerDocs = (app, port) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  console.log(
    `📄 Documentación de la API disponible en http://localhost:${port}/api-docs`,
  );
};
