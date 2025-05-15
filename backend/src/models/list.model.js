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
        model: "t_User", // Nombre de la tabla referenciada
        key: "user_id", // Clave primaria de la tabla referenciada
      },
    },
    nombre: DataTypes.STRING,
  },
  {
    tableName: "t_List",
  }
);

module.exports = List;
