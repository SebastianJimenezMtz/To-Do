const express = require("express");
const router = express.Router();
const List = require("../models/taskList.model");
const Task = require("../models/task.model");

// Obtener todas las listas de tareas del usuario
router.get("/", async (req, res) => {
  try {
    const userId = req.user.userId;

    const lists = await List.findAll({ where: { UserID: userId } });

    return res.status(200).json(lists);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Obtener todas las tareas de una lista específica
router.get("/:listId/tasks", async (req, res) => {
  try {
    const userId = req.user.userId;
    const { listId } = req.params;

    const list = await List.findOne({
      where: { ListID: listId, UserID: userId },
    });

    if (!list) {
      return res.status(404).json({ error: "Lista no encontrada" });
    }

    const tasks = await Task.findAll({
      where: { ListID: listId },
    });

    return res.status(200).json(tasks);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Crear una nueva lista de tareas
router.post("/", async (req, res) => {
  try {
    const userId = req.user.userId;
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ error: "El título es obligatorio" });
    }

    const newList = await List.create({
      UserID: userId,
      Title: title,
    });

    return res.status(201).json(newList);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Crear una nueva tarea en una lista específica
router.post("/:listId/tasks", async (req, res) => {
  try {
    const { title, description, priority, dueDate } = req.body;
    const listId = req.params.listId;

    if (!title || !description || !priority || !dueDate) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }

    const newTask = await Task.create({
      Title: title,
      Description: description,
      ListID: listId,
      Priority: priority,
      DueDate: dueDate,
    });

    return res.status(201).json(newTask);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Actualizar una lista de tareas
router.patch("/:listId", async (req, res) => {
  try {
    const userId = req.user.userId;
    const { listId } = req.params;
    const { title } = req.body;

    if (title === undefined) {
      return res
        .status(400)
        .json({ error: "Se requiere al menos un campo para actualizar" });
    }

    const list = await List.findOne({
      where: { ListID: listId, UserID: userId },
    });

    if (!list) {
      return res.status(404).json({ error: "Lista no encontrada" });
    }

    const currentDate = new Date();

    if (title !== undefined) list.Title = title;
    list.UpdatedAt = currentDate;

    await list.save();

    return res.status(200).json(list);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Eliminar una lista de tareas
router.delete("/:listId", async (req, res) => {
  try {
    const userId = req.user.userId;
    const { listId } = req.params;

    const list = await List.findOne({
      where: { ListID: listId, UserID: userId },
    });

    if (!list) {
      return res.status(404).json({ error: "Lista no encontrada" });
    }

    await list.destroy();

    return res.status(200).json({ message: "Lista eliminada correctamente" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
