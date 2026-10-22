
const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../config/db");

const router = express.Router();

// Register a new user
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // Check required fields
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      typeof confirmPassword !== "string" ||
      !name.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).json({
        message: "Please fill in all fields.",
      });
    }

    const fullName = name.trim();
    const userEmail = email.trim().toLowerCase();

    if (
      fullName.length > 100 ||
      userEmail.length > 255 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)
    ) {
      return res.status(400).json({
        message: "Please enter a valid name and email.",
      });
    }

    // Check password confirmation
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match.",
      });
    }

    // Password requirements
    if (
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/[0-9]/.test(password) ||
      !/[^A-Za-z0-9]/.test(password)
    ) {
      return res.status(400).json({
        message: "Use at least 8 characters, an uppercase letter, a number, and a symbol.",
      });
    }

    // Check if email already exists
    const [existingUsers] = await db.execute(
      "SELECT id FROM users WHERE email = ? LIMIT 1",
      [userEmail]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({
        message: "This email is already registered.",
      });
    }

    // Securely hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // Save user in MySQL
    await db.execute(
      "INSERT INTO users (full_name, email, password_hash) VALUES (?, ?, ?)",
      [fullName, userEmail, passwordHash]
    );

    return res.status(201).json({
      message: "Account created successfully!",
    });

  } catch (error) {
    // Handle duplicate email if two requests arrive together
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        message: "This email is already registered.",
      });
    }

    console.error("Signup error:", error);

    return res.status(500).json({
      message: "Something went wrong. Please try again.",
    });
  }
});

module.exports = router;
