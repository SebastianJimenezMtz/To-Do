// models/User.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const List = sequelize.define(
  "Lists",
  {
    list_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users", // Nombre de la tabla referenciada
        key: "user_id", // Clave primaria de la tabla referenciada
      },
    },
    name: DataTypes.STRING,
  },
  {
    tableName: "Lists",
  }
);

module.exports = List;
