const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const TaskList = require("./taskList.model");

const Task = sequelize.define(
  "Tasks",
  {
    TaskID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ListID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: TaskList,
        key: "ListID",
      },
    },
    Title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Description: {
      type: DataTypes.TEXT, // Changed from STRING to TEXT
      allowNull: true,
    },
    IsCompleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    DueDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    Priority: {
      type: DataTypes.INTEGER, // Changed from STRING to INTEGER
      allowNull: true,
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
    tableName: "Tasks",
  }
);

module.exports = Task;
