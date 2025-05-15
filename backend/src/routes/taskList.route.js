const express = require("express");
const router = express.Router();
const List = require("../models/taskList.model");

router.get("/", async (req, res) => {
  try {
    const userId = req.user.userId;

    const lists = await List.findAll({ where: { UserID: userId } });

    console.log(lists);

    return res.status(200).json(lists);
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
      UserID: userId,
      Title: title,
    });

    return res.status(201).json(newList);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.put("/:listId", async (req, res) => {
  try {
    const userId = req.user.userId;
    const { listId } = req.params;
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ error: "El título es obligatorio" });
    }

    const list = await List.findOne({
      where: { ListID: listId, UserID: userId },
    });

    if (!list) {
      return res.status(404).json({ error: "Lista no encontrada" });
    }

    // Obtener la fecha y hora actual
    const currentDate = new Date();

    list.Title = title;
    list.UpdatedAt = currentDate;

    await list.save();

    return res.status(200).json(list);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

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
