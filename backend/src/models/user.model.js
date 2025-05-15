const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define(
  "t_User",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    nombre: { type: DataTypes.STRING, allowNull: false },
    correo: { type: DataTypes.STRING, allowNull: false, unique: true },
    contrasena: { type: DataTypes.STRING, allowNull: false },
  },
  {
    timestamps: false,
    tableName: "t_User",
  }
);

module.exports = User;
