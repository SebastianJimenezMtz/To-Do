const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Task = sequelize.define(
  "Task",
  {
    tast_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    list_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "t_List", // Nombre de la tabla referenciada
        key: "list_id", // Clave primaria de la tabla referenciada
      },
    },
    titulo: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    estado: DataTypes.BOOLEAN,
  },
  {
    tableName: "Tasks",
  }
);

module.exports = Task;
