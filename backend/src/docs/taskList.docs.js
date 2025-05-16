/**
 * Documentación Swagger para el módulo de listas de tareas.
 */

// Definición de etiquetas
const taskListTags = {
  name: "Lista de Tareas",
  description: "Endpoints para la gestión de listas de tareas.",
};

// Documentación para el endpoint GET (obtener todas las listas)
const getTaskListsDocs = {
  get: {
    summary: "Obtener todas las listas de tareas del usuario.",
    tags: ["Lista de Tareas"],
    security: [{ bearerAuth: [] }],
    responses: {
      200: {
        description: "Listas de tareas obtenidas exitosamente.",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Lista",
              },
            },
          },
        },
      },
      401: {
        description: "Token de autenticación inválido o no proporcionado.",
      },
      500: {
        description: "Error interno del servidor.",
      },
    },
  },
};

// Documentación para el endpoint POST (Crear una nueva lista de tareas)
const createTaskListDocs = {
  post: {
    // Mover el método POST aquí
    summary: "Crear una nueva lista de tareas.",
    tags: ["Lista de Tareas"],
    security: [{ bearerAuth: [] }],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              Title: {
                type: "string",
                description: "Título de la lista de tareas.",
                example: "Lista de Compras",
              },
            },
            required: ["Title"],
          },
        },
      },
    },
    responses: {
      201: {
        description: "Lista de tareas creada exitosamente.",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Lista",
            },
          },
        },
      },
      401: {
        description: "Token de autenticación inválido o no proporcionado.",
      },
      500: {
        description: "Error interno del servidor.",
      },
    },
  },
};

// Documentación para el endpoint GET (Obtener todas las tareas de una lista específica)
const getTaskListByIdDocs = {
  get: {
    // Mover el método GET aquí
    summary: "Obtener todas las tareas de una lista específica.",
    tags: ["Lista de Tareas"],
    security: [{ bearerAuth: [] }],
    parameters: [
      {
        name: "list_id",
        in: "path",
        required: true,
        description: "ID de la lista de tareas.",
        schema: {
          type: "integer",
        },
      },
    ],
    responses: {
      200: {
        description: "Tareas de la lista obtenidas exitosamente.",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Tarea",
              },
            },
          },
        },
      },
      401: {
        description: "Token de autenticación inválido o no proporcionado.",
      },
      404: {
        description: "Lista no encontrada.",
      },
      500: {
        description: "Error interno del servidor.",
      },
    },
  },
};

// Documentación para el endpoint POST (Crear una nueva tarea asociada a una lista)
const createTaskDocs = {
  post: {
    summary: "Crear una nueva tarea asociada a una lista.",
    tags: ["Lista de Tareas"],
    security: [{ bearerAuth: [] }],
    parameters: [
      {
        name: "list_id",
        in: "path",
        required: true,
        description: "ID de la lista a la que se asociará la tarea.",
        schema: {
          type: "integer",
        },
      },
    ],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              Title: {
                type: "string",
                description: "Título de la tarea.",
                example: "Comprar pan",
              },
              Description: {
                type: "string",
                description: "Descripción detallada de la tarea.",
                example: "Ir a la panadería antes de las 5pm.",
              },
              DueDate: {
                type: "string",
                format: "date-time",
                description: "Fecha y hora límite para completar la tarea.",
                example: "2023-10-01T12:00:00.000Z",
              },
              Priority: {
                type: "string",
                description: "Prioridad de la tarea (alta, media, baja).",
                enum: ["alta", "media", "baja"],
                example: "alta",
              },
            },
            required: ["Title"],
          },
        },
      },
    },
    responses: {
      201: {
        description:
          "Tarea creada exitosamente y asociada a la lista especificada.",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Tarea",
            },
          },
        },
      },
      401: {
        description: "Token de autenticación inválido o no proporcionado.",
      },
      404: {
        description: "Lista no encontrada o no pertenece al usuario.",
      },
      500: {
        description: "Error interno del servidor.",
      },
    },
  },
};

// Documentación para el endpont PATCH (Actualizar una lista de tareas)
const updateTaskListDocs = {
  patch: {
    summary: "Actualizar una lista de tareas.",
    tags: ["Lista de Tareas"],
    security: [{ bearerAuth: [] }],
    parameters: [
      {
        name: "list_id",
        in: "path",
        required: true,
        description: "ID de la lista de tareas a actualizar.",
        schema: {
          type: "integer",
        },
      },
    ],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              Title: {
                type: "string",
                description: "Nuevo título para la lista.",
                example: "Mi lista actualizada",
              },
            },
            required: ["Title"],
          },
        },
      },
    },
    responses: {
      200: {
        description: "Lista actualizada exitosamente.",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Lista",
            },
          },
        },
      },
      400: {
        description:
          "Solicitud inválida (no se proporcionaron campos para actualizar).",
      },
      401: {
        description: "Token de autenticación inválido o no proporcionado.",
      },
      404: {
        description: "Lista no encontrada o no pertenece al usuario.",
      },
      500: {
        description: "Error interno del servidor.",
      },
    },
  },
};

// Documentación para el endpoint DELETE (Eliminar una lista de tareas)
const deleteTaskListDocs = {
  delete: {
    summary: "Eliminar una lista de tareas.",
    tags: ["Lista de Tareas"],
    security: [{ bearerAuth: [] }],
    parameters: [
      {
        name: "list_id",
        in: "path",
        required: true,
        description: "ID de la lista de tareas a eliminar.",
        schema: {
          type: "integer",
        },
      },
    ],
    responses: {
      200: {
        description: "Lista eliminada exitosamente.",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                  example: "Lista eliminada correctamente.",
                },
              },
            },
          },
        },
      },
      401: {
        description: "Token de autenticación inválido o no proporcionado.",
      },
      404: {
        description: "Lista no encontrada o no pertenece al usuario.",
      },
      500: {
        description: "Error interno del servidor.",
      },
    },
  },
};

// Esquema para la definición de una lista de tareas
const taskListSchema = {
  Lista: {
    type: "object",
    properties: {
      ListID: {
        type: "integer",
        description: "ID único de la lista.",
        example: 1,
      },
      Title: {
        type: "string",
        description: "Título de la lista de tareas.",
        example: "Lista de Compras",
      },
      UserID: {
        type: "integer",
        description: "ID del usuario propietario de la lista.",
        example: 1,
      },
      CreatedAt: {
        type: "string",
        format: "date-time",
        description: "Fecha y hora de creación de la lista.",
        example: "2023-10-01T12:00:00.000Z",
      },
      UpdatedAt: {
        type: "string",
        format: "date-time",
        description: "Fecha y hora de la última actualización de la lista.",
        example: "2023-10-01T12:00:00.000Z",
      },
    },
  },
};

// Esquema para la definición de una tarea
const taskSchema = {
  Tarea: {
    type: "object",
    properties: {
      TaskID: {
        type: "integer",
        description: "ID único de la tarea.",
        example: 1,
      },
      ListID: {
        type: "integer",
        description: "ID de la lista a la que pertenece la tarea.",
        example: 1,
      },
      Title: {
        type: "string",
        description: "Título de la tarea.",
        example: "Comprar pan",
      },
      Description: {
        type: "string",
        description: "Descripción detallada de la tarea.",
        example: "Ir a la panadería antes de las 5pm.",
      },
      Completed: {
        type: "boolean",
        description: "Indica si la tarea ha sido completada.",
        example: false,
      },
      DueDate: {
        type: "string",
        format: "date-time",
        description: "Fecha y hora límite para completar la tarea.",
        example: "2023-10-01T12:00:00.000Z",
      },
      Priority: {
        type: "string",
        description: "Prioridad de la tarea (alta, media, baja).",
        enum: ["alta", "media", "baja"],
        example: "alta",
      },
      CreatedAt: {
        type: "string",
        format: "date-time",
        description: "Fecha y hora de creación de la tarea.",
        example: "2023-01-01T10:00:00Z",
      },
      UpdatedAt: {
        type: "string",
        format: "date-time",
        description: "Fecha y hora de la última actualización de la tarea.",
        example: "2023-01-01T10:00:00Z",
      },
    },
  },
};

module.exports = {
  tags: taskListTags,
  paths: {
    "/taskList": {
      ...getTaskListsDocs,
      ...createTaskListDocs,
    },
    "/taskList/{list_id}": {
      ...updateTaskListDocs,
      ...deleteTaskListDocs,
    },
    "/taskList/{list_id}/tasks": {
      ...getTaskListByIdDocs,
      ...createTaskDocs,
    },
  },
  components: {
    schemas: {
      ...taskListSchema,
      ...taskSchema,
    },
  },
};
