const express = require("express");
const router = express.Router();
const List = require("../models/taskList.model");
const Task = require("../models/task.model");

/**
 * @swagger
 * tags:
 *   name: Lista de Tareas
 *   description: Endpoints para gestión de las listas de tareas
 */

/**
 * @swagger
 * /taskList:
 *   get:
 *     summary: Obtener todas las listas de tareas del usuario
 *     tags: [Lista de Tareas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Listas de tareas obtenidas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ListID:
 *                   type: integer
 *                   example: 1
 *                 Title:
 *                   type: string
 *                   example: "Lista de Compras"
 *                 UserID:
 *                   type: integer
 *                   example: 1
 *                 CreatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2023-10-01T12:00:00.000Z"
 *                 UpdatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2023-10-01T12:00:00.000Z"
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.get("/", async (req, res) => {
  try {
    const userId = req.user.userId;

    const lists = await List.findAll({ where: { UserID: userId } });

    return res.status(200).json(lists);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /taskList/{list_id}/tasks:
 *   get:
 *     summary: Obtener todas las tareas de una lista específica
 *     description: Retorna todas las tareas asociadas a una lista particular del usuario autenticado
 *     tags: [Lista de Tareas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: list_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la lista de tareas
 *     responses:
 *       200:
 *         description: Lista de tareas obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   TaskID:
 *                     type: integer
 *                     example: 1
 *                   ListID:
 *                     type: integer
 *                     example: 1
 *                   Title:
 *                     type: string
 *                     example: "Comprar leche"
 *                   Description:
 *                     type: string
 *                     example: "Comprar leche deslactosada"
 *                   IsCompleted:
 *                     type: boolean
 *                     example: false
 *                   DueDate:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-05-20T00:00:00.000Z"
 *                   Priority:
 *                     type: string
 *                     enum: [Low, Medium, High]
 *                     example: Medium
 *                   CreatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-05-15T22:51:31.000Z"
 *                   UpdatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-05-16T01:48:42.492Z"
 *       401:
 *         description: No autorizado (token inválido o no proporcionado)
 *       404:
 *         description: Lista no encontrada o no pertenece al usuario
 *       500:
 *         description: Error interno del servidor
 */
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

/**
 * @swagger
 * /taskList:
 *   post:
 *     summary: Crear una nueva lista de tareas
 *     description: Crea una nueva lista de tareas asociada al usuario autenticado
 *     tags: [Lista de Tareas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título de la lista de tareas
 *                 example: "Lista de compras"
 *     responses:
 *       201:
 *         description: Lista creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ListID:
 *                   type: integer
 *                   example: 1
 *                 UserID:
 *                   type: integer
 *                   example: 1
 *                 Title:
 *                   type: string
 *                   example: "Lista de compras"
 *                 CreatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-05-16T10:30:45.000Z"
 *                 UpdatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-05-16T10:30:45.000Z"
 *       400:
 *         description: Solicitud inválida (faltan campos obligatorios)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "El título es obligatorio"
 *       401:
 *         description: No autorizado (token inválido o no proporcionado)
 *       500:
 *         description: Error interno del servidor
 */
router.post("/:list_id/tasks", async (req, res) => {
  try {
    const { title, description, priority, dueDate } = req.body;
    const list_id = req.params.list_id;

    if (!title || !description || !priority || !dueDate) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }

    const newTask = await Task.create({
      Title: title,
      Description: description,
      ListID: list_id,
      Priority: priority,
      DueDate: dueDate,
    });

    return res.status(201).json(newTask);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /taskList/{list_id}:
 *   patch:
 *     summary: Actualizar una lista de tareas
 *     description: Actualiza los datos de una lista de tareas existente
 *     tags: [Lista de Tareas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: list_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la lista a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Nuevo título para la lista
 *                 example: "Mi lista actualizada"
 *     responses:
 *       200:
 *         description: Lista actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ListID:
 *                   type: integer
 *                   example: 1
 *                 UserID:
 *                   type: integer
 *                   example: 1
 *                 Title:
 *                   type: string
 *                   example: "Mi lista actualizada"
 *                 CreatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-05-16T10:30:45.000Z"
 *                 UpdatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-05-16T12:45:30.000Z"
 *       400:
 *         description: Solicitud inválida (no se proporcionaron campos para actualizar)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Se requiere al menos un campo para actualizar"
 *       401:
 *         description: No autorizado (token inválido o no proporcionado)
 *       404:
 *         description: Lista no encontrada o no pertenece al usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Lista no encontrada"
 *       500:
 *         description: Error interno del servidor
 */
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

/**
 * @swagger
 * /taskList/{list_id}:
 *   delete:
 *     summary: Eliminar una lista de tareas
 *     description: Elimina una lista de tareas específica del usuario autenticado
 *     tags: [Lista de Tareas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: list_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la lista a eliminar
 *     responses:
 *       200:
 *         description: Lista eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Lista eliminada correctamente"
 *       401:
 *         description: No autorizado (token inválido o no proporcionado)
 *       404:
 *         description: Lista no encontrada o no pertenece al usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Lista no encontrada"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Mensaje de error detallado"
 */
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
