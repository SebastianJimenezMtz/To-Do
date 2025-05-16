const express = require("express");
const router = express.Router();
const List = require("../models/taskList.model");
const Task = require("../models/task.model");

router.get("/", async (req, res) => {
  try {
    const userId = req.user.userId;

    const lists = await List.findAll({ where: { UserID: userId } });

    return res.status(200).json(lists);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.get("/:list_id/tasks", async (req, res) => {
  try {
    const userId = req.user.userId;
    const { list_id } = req.params;

    const list = await List.findOne({
      where: { ListID: list_id, UserID: userId },
    });

    if (!list) {
      return res.status(404).json({ error: "Lista no encontrada" });
    }

    const tasks = await Task.findAll({
      where: { ListID: list_id },
    });

    return res.status(200).json(tasks);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const userId = req.user.userId;
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ error: "El título es obligatorio" });
    }

    const newList = await List.create({
      Title: title,
      UserID: userId,
    });

    return res.status(201).json(newList);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.post("/:list_id/tasks", async (req, res) => {
  try {
    const { Title, Description, Priority, DueDate } = req.body;
    const list_id = req.params.list_id;

    if (!Title || !Description || !Priority || !DueDate) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }

    // Verificar si la lista existe y pertenece al usuario
    const list = await List.findOne({
      where: { ListID: list_id, UserID: req.user.userId },
    });

    if (!list) {
      return res.status(404).json({ error: "Lista no encontrada" });
    }

    const newTask = await Task.create({
      Title: Title,
      Description: Description,
      ListID: list_id,
      Priority: Priority,
      DueDate: DueDate,
    });

    return res.status(201).json(newTask);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.patch("/:list_id", async (req, res) => {
  try {
    const userId = req.user.userId;
    const { list_id } = req.params;
    const { title } = req.body;

    if (title === undefined) {
      return res
        .status(400)
        .json({ error: "Se requiere al menos un campo para actualizar" });
    }

    const list = await List.findOne({
      where: { ListID: list_id, UserID: userId },
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

router.delete("/:list_id", async (req, res) => {
  try {
    const userId = req.user.userId;
    const { list_id } = req.params;

    const list = await List.findOne({
      where: { ListID: list_id, UserID: userId },
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
