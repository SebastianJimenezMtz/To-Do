const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user.model"); // Importar el modelo de usuario

const TaskList = sequelize.define(
  "TaskLists",
  {
    ListID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "UserID",
      },
    },
    Title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Description: { // Adding the Description field
      type: DataTypes.TEXT, // VARCHAR(MAX) translates to TEXT in Sequelize
      allowNull: true, // Assuming Description can be optional
    },
    CreatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    UpdatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    tableName: "TaskLists",
  }
);

module.exports = TaskList;
