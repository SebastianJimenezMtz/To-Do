const express = require("express");
const router = express.Router();
const Task = require("../models/task.model");

router.patch("/:task_id", async (req, res) => {
  try {
    const { task_id } = req.params;
    // Cambia las propiedades a la primer letra mayúscula
    const { Title, Description, IsCompleted, DueDate, Priority } = req.body;

    const task = await Task.findByPk(task_id);

    if (!task) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    const currentDate = new Date();

    if (Title !== undefined) task.Title = Title;
    if (Description !== undefined) task.Description = Description;
    if (IsCompleted !== undefined) task.IsCompleted = IsCompleted;
    if (DueDate !== undefined) task.DueDate = DueDate;
    if (Priority !== undefined) task.Priority = Priority;
    task.UpdatedAt = currentDate;

    await task.save();

    return res.status(200).json(task);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.delete("/:task_id", async (req, res) => {
  try {
    const { task_id } = req.params;

    const task = await Task.findByPk(task_id);

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
