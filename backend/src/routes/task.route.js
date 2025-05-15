const express = require("express");
const router = express.Router();
const Task = require("../models/task.model");

// Modificar una tarea
router.patch("/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, description, completed } = req.body;

    const task = await Task.findByPk(taskId);

    if (!task) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    const currentDate = new Date();

    if (title !== undefined) task.Title = title;
    if (description !== undefined) task.Description = description;
    if (completed !== undefined) task.Completed = completed;
    task.UpdatedAt = currentDate;

    await task.save();

    return res.status(200).json(task);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Eliminar una tarea
router.delete("/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findByPk(taskId);

    if (!task) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    await task.destroy();

    return res.status(200).json({ message: "Tarea eliminada correctamente" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});
module.exports = router;
