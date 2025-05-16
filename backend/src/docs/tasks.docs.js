/**
 * Documentación Swagger para el módulo de tareas
 */

// Definición de etiquetas
const tasksTags = {
  name: "Tareas",
  description: "Endpoints para gestión de tareas",
};

// Documentación para el endpoint PATCH (modificar tarea)
const updateTaskDocs = {
  "/tasks/{task_id}": {
    patch: {
      summary: "Modificar una tarea existente",
      tags: ["Tareas"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "task_id",
          required: true,
          schema: {
            type: "integer",
          },
          description: "ID de la tarea a modificar",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                title: {
                  type: "string",
                  example: "Comprar pan",
                },
                description: {
                  type: "string",
                  example: "Ir a la panadería antes de las 5pm",
                },
                completed: {
                  type: "boolean",
                  example: true,
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Tarea actualizada correctamente",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Tarea",
              },
            },
          },
        },
        401: {
          description: "Token de autenticación inválido o no proporcionado",
        },
        404: {
          description: "Tarea no encontrada",
        },
        500: {
          description: "Error del servidor",
        },
      },
    },
  },
};

// Documentación para el endpoint DELETE (eliminar tarea)
const deleteTaskDocs = {
  "/tasks/{task_id}": {
    delete: {
      summary: "Eliminar una tarea",
      tags: ["Tareas"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "task_id",
          required: true,
          schema: {
            type: "integer",
          },
          description: "ID de la tarea a eliminar",
        },
      ],
      responses: {
        200: {
          description: "Tarea eliminada correctamente",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Tarea eliminada correctamente",
                  },
                },
              },
            },
          },
        },
        401: {
          description: "Token de autenticación inválido o no proporcionado",
        },
        404: {
          description: "Tarea no encontrada",
        },
        500: {
          description: "Error del servidor",
        },
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
  tags: tasksTags,
  paths: {
    "/tasks/{task_id}": {
      ...updateTaskDocs["/tasks/{task_id}"],
      ...deleteTaskDocs["/tasks/{task_id}"],
    },
  },
  schemas: taskSchema,
};
