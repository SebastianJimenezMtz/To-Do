const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const verifyJWT = require("../middleware/auth");

const JWT_SECRET = process.env.JWT_SECRET;

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
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }

    const existingUser = await User.findOne({ where: { Email: email } });

    if (existingUser) {
      return res.status(409).json({ error: "El usuario ya existe" });
    }

    const encryptedPassword = await encryptPassword(password);

    const newUser = await User.create({
      Username: username,
      Email: email,
      PasswordHash: encryptedPassword,
    });

    res.status(201).json({ message: "Usuario registrado correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Iniciar sesión con JWT
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }

    const user = await User.findOne({ where: { Email: email } });

    if (!user) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const isMatch = await comparePasswords(password, user.PasswordHash);

    if (!isMatch) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // Crear token JWT
    const token = jwt.sign(
      { userId: user.UserID, email: user.Email },
      JWT_SECRET,
      { expiresIn: "7d" } // Cambiar a 2h para producción
    );

    // Retornar token e info básica del usuario
    res.status(200).json({
      token,
      user: {
        id: user.UserID,
        name: user.Username,
        email: user.Email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
