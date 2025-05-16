const express = require("express");
const router = express.Router();
const Task = require("../models/task.model");

/**
 * @swagger
 * tags:
 *   name: Tareas
 *   description: Endpoints para gestión de tareas
 */

/**
 * @swagger
 * /tasks/{task_id}:
 *   patch:
 *     summary: Modificar una tarea existente
 *     tags: [Tareas]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: task_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarea a modificar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Comprar pan
 *               description:
 *                 type: string
 *                 example: Ir a la panadería antes de las 5pm
 *               completed:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Tarea actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tarea'
 *       404:
 *         description: Tarea no encontrada
 *       500:
 *         description: Error del servidor
 */
router.patch("/:task_id", async (req, res) => {
  try {
    const { task_id } = req.params;
    const { title, description, completed } = req.body;

    const task = await Task.findByPk(task_id);

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

/**
 * @swagger
 * /tasks/{task_id}:
 *   delete:
 *     summary: Eliminar una tarea
 *     tags: [Tareas]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: task_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarea a eliminar
 *     responses:
 *       200:
 *         description: Tarea eliminada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Tarea eliminada correctamente
 *       404:
 *         description: Tarea no encontrada
 *       500:
 *         description: Error del servidor
 */
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
