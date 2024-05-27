const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Catway API',
      version: '1.0.0',
      description: 'Documentation de l\'API Catway',
    },
    components: {
      schemas: {
        Catway: {
          type: 'object',
          properties: {
            catwayNumber: {
              type: 'integer',
              description: 'Numéro de la passerelle'
            },
            type: {
              type: 'string',
              description: 'Type de la passerelle'
            },
            catwayState: {
              type: 'string',
              description: 'État de la passerelle'
            }
          },
        },
        
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.js', './controllers/*.js'], 
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
