const sequelize = require("./src/config/db");
const express = require("express");
const morgan = require("morgan");

const app = express();

// Rutas
const authRoute = require("./src/routes/auth.route");
const taskListRoute = require("./src/routes/taskList.route");
const taskRoute = require("./src/routes/task.route");

// Middlewares
const cors = require("./src/middleware/cors");
const authorization = require("./src/middleware/auth");
const notFound = require("./src/middleware/notFound");

app.use(cors);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Para recibir datos de formularios

app.use("/auth", authRoute);
app.use(authorization); // Middleware de autorización para proteger rutas
app.use("/taskList", taskListRoute);
app.use("/tasks", taskRoute);
app.use(notFound);

const HOST = "127.0.0.1";
const PORT = 4050;

sequelize
  .authenticate()
  .then(() => {
    console.log("Conectado a la base de datos MySQL");
    app.listen(PORT, HOST, () => {
      console.log(`Servidor corriendo en http://${HOST}:${PORT}`);
    });
  })
  .catch((err) => console.error("Error de conexión:", err));
