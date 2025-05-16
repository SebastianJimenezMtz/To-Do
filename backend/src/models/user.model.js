const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define(
  "Users",
  {
    UserID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    PasswordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CreatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    LastLogin: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    tableName: "Users",
  }
);

module.exports = User;
