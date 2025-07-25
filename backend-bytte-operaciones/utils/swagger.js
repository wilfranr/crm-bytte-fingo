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
    schemas: {
      Cliente: {
        type: 'object',
        properties: {
          id_freshdesk: {
            type: 'integer',
            description: 'ID único del cliente en Freshdesk.',
          },
          name: {
            type: 'string',
            description: 'Nombre completo del cliente.',
          },
          email: {
            type: 'string',
            format: 'email',
            description: 'Correo electrónico del cliente.',
          },
          mobile: {
            type: 'string',
            description: 'Número de teléfono móvil del cliente.',
          },
          direccion: {
            type: 'string',
            description: 'Dirección del cliente.',
          },
          ciudad: {
            type: 'string',
            description: 'Ciudad de residencia del cliente.',
          },
          departamento: {
            type: 'string',
            description: 'Departamento de residencia del cliente.',
          },
          company_id: {
            type: 'integer',
            description: 'ID de la compañía asociada al cliente en Freshdesk.',
          },
          custom_fields: {
            type: 'object',
            additionalProperties: {
              type: 'string',
            },
            description: 'Campos personalizados del cliente.',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Fecha de creación del registro en la base de datos.',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Fecha de la última actualización del registro en la base de datos.',
          },
        },
        required: ['id_freshdesk', 'name', 'email'],
      },
      Tarjeta: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            description: 'ID de la tarjeta en la base de datos.',
          },
          clientId: {
            type: 'string',
            description: 'ID del cliente al que pertenece la tarjeta.',
          },
          deliveryDate: {
            type: 'string',
            format: 'date',
            description: 'Fecha de entrega de la tarjeta (YYYY-MM-DD).',
          },
          cardNumber: {
            type: 'string',
            description: 'Número de la tarjeta (opcional).',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Fecha de creación del registro en la base de datos.',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Fecha de la última actualización del registro en la base de datos.',
          },
        },
        required: ['clientId', 'deliveryDate'],
      },
    },
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
