/**
 * Documentación Swagger para el módulo de autenticación
 */

// Definición de etiquetas
const authTags = {
  name: "Auth",
  description: "Endpoints de autenticación",
};

// Documentación para el endpoint de registro
const registerDocs = {
  "/auth/register": {
    post: {
      summary: "Registrar un nuevo usuario",
      tags: ["Auth"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["username", "email", "password"],
              properties: {
                username: {
                  type: "string",
                  example: "juan123",
                },
                email: {
                  type: "string",
                  example: "juan@example.com",
                },
                password: {
                  type: "string",
                  example: "miPasswordSegura",
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "Usuario registrado correctamente",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Usuario registrado correctamente",
                  },
                },
              },
            },
          },
        },
        400: {
          description: "Faltan campos obligatorios",
        },
        409: {
          description: "El usuario ya existe",
        },
        500: {
          description: "Error del servidor",
        },
      },
    },
  },
};

// Documentación para el endpoint de login
const loginDocs = {
  "/auth/login": {
    post: {
      summary: "Iniciar sesión de usuario",
      tags: ["Auth"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["email", "password"],
              properties: {
                email: {
                  type: "string",
                  example: "juan@example.com",
                },
                password: {
                  type: "string",
                  example: "miPasswordSegura",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Usuario autenticado correctamente",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  token: {
                    type: "string",
                    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                  },
                  user: {
                    type: "object",
                    properties: {
                      id: {
                        type: "integer",
                        example: 1,
                      },
                      name: {
                        type: "string",
                        example: "Juan Pérez",
                      },
                      email: {
                        type: "string",
                        example: "juan@example.com",
                      },
                    },
                  },
                },
              },
            },
          },
        },
        400: {
          description: "Faltan campos obligatorios",
        },
        401: {
          description: "Credenciales inválidas",
        },
        500: {
          description: "Error del servidor",
        },
      },
    },
  },
};

module.exports = {
  tags: authTags,
  paths: {
    ...registerDocs,
    ...loginDocs,
  },
};
