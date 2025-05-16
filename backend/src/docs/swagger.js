/**
 * Configuración de Swagger para la aplicación
 * Este archivo integra toda la documentación de los diferentes módulos
 */

const swaggerJsdoc = require("swagger-jsdoc");

// Importar documentaciones individuales
const authDocs = require("./auth.docs");
const taskDocs = require("./tasks.docs");
const taskListDocs = require("./taskList.docs");

// Definición base de Swagger
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
    schemas: {
      ...taskDocs.schemas,
      ...taskListDocs.schemas,
    },
  },
  // Agregar la documentación de rutas desde los módulos específicos
  components: taskListDocs.components,
  tags: [authDocs.tags, taskDocs.tags, taskListDocs.tags],
  paths: {
    ...authDocs.paths,
    ...taskDocs.paths,
    ...taskListDocs.paths,
  },
};

// Opciones para swagger-jsdoc
const options = {
  swaggerDefinition,
  // No especificamos archivos para buscar anotaciones JSDoc ya que
  // estamos cargando la documentación desde los módulos importados
  apis: [],
};

// Exportar la configuración de Swagger
module.exports = swaggerJsdoc(options);
