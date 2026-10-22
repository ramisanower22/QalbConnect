
const express = require("express");
const db = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = 3000;

// Allow server to receive JSON data
app.use(express.json());

// Signup and login API routes
app.use("/api/auth", authRoutes);

// Homepage
app.get("/", (req, res) => {
  res.send("Welcome to QalbConnect!");
});

// Test MySQL connection
app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT DATABASE() AS database_name"
    );

    res.json({
      message: "Database connected successfully!",
      database: rows[0].database_name,
    });
  } catch (error) {
    console.error("Database error:", error.message);

    res.status(500).json({
      message: "Database connection failed!",
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(
    `QalbConnect server running at http://localhost:${PORT}`
  );
});
