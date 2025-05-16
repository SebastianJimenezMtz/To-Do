const swaggerJsdoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API de Tareas",
    version: "1.0.0",
    description: "Documentación de la API de Tareas con autenticación JWT",
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ["src/routes/*.js"],
};

module.exports = swaggerJsdoc(options);
