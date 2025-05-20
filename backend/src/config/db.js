const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

// Cargar variables de entorno
dotenv.config();

// Crear instancia de Sequelize con variables de entorno
let sequelize;
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "mysql",
    protocol: "mysql",
    dialectOptions: {
      ssl: process.env.DB_SSL === "true" ? { require: true, rejectUnauthorized: false } : false,
    },
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    logging: false, // Cambiar a true para ver las consultas en consola
  });
} else {
  sequelize = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: "mysql",
      pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
      logging: false, // Cambiar a true para ver las consultas en consola
    }
  );
}

// Probar conexión
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión a MySQL establecida con Sequelize.");
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
  }
})();

module.exports = sequelize;
