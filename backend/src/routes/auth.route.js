const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user.model");

// Función para encriptar la contraseña
const encryptPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// Función para comparar contraseñas
const comparePasswords = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

// Registrar un nuevo usuario
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validar campos requeridos
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: "El usuario ya existe" });
    }

    // Encriptar la contraseña
    const encryptedPassword = await encryptPassword(password);

    // Crear el usuario
    const newUser = await User.create({ name, email, encryptedPassword });

    // Ocultar la contraseña en la respuesta
    newUser.password = undefined;

    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Iniciar sesión
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validar campos requeridos
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }

    // Buscar usuario
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // Verificar contraseña
    const isMatch = await comparePasswords(password, user.encryptedPassword);
    if (!isMatch) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // Ocultar la contraseña en la respuesta
    user.password = undefined;

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
