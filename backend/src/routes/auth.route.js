const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

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

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({ where: { Email: email } });

    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    const encryptedPassword = await encryptPassword(password);

    await User.create({
      Username: username,
      Email: email,
      PasswordHash: encryptedPassword,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const user = await User.findOne({ where: { Email: email } });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await comparePasswords(password, user.PasswordHash);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    user.LastLogin = new Date();
    await user.save();

    const token = jwt.sign(
      { userId: user.UserID, email: user.Email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

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
