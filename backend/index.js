const express = require("express");
const morgan = require("morgan");
const sequelize = require("./src/config/db");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./src/docs/swagger");
const cors = require("cors"); // ✅ Paquete oficial de CORS

const app = express();

// Middlewares
const authorization = require("./src/middleware/auth");
const notFound = require("./src/middleware/notFound");

// Rutas
const authRoute = require("./src/routes/auth.route");
const taskListRoute = require("./src/routes/taskList.route");
const taskRoute = require("./src/routes/task.route");

// Configuraciones
const HOST = process.env.API_HOST || '0.0.0.0';
const PORT = process.env.PORT || process.env.API_PORT || 3001;

// ✅ CORS oficial configurado para permitir el frontend
const corsOptions = {
  origin: "https://calm-sky-0d30dfd1e.6.azurestaticapps.net",
  credentials: true,
};

app.use(cors(corsOptions)); // ✅ Middleware CORS
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta de documentación
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas públicas
app.use("/auth", authRoute);

// Middleware de autorización para rutas protegidas
app.use(authorization);

// Rutas protegidas
app.use("/taskList", taskListRoute);
app.use("/tasks", taskRoute);

// Middleware para manejar rutas no encontradas
app.use(notFound);

// Inicio del servidor
sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Conectado a la base de datos MySQL");
    app.listen(PORT, HOST, () => {
      console.log(`🚀 Servidor corriendo en http://${HOST}:${PORT}`);
      console.log(`📚 Documentación disponible en http://${HOST}:${PORT}/api-docs`);
    });
  })
  .catch((err) => console.error("❌ Error de conexión:", err));

