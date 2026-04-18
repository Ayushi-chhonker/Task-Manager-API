// Import packages
require("dotenv").config(); 
console.log("JWT_SECRET:", process.env.JWT_SECRET);
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import database connection
const connectDB = require("./config/db");

// Connect database
connectDB();

const taskRoutes = require("./routes/taskRoutes");

const authRoutes = require("./routes/authRoutes");

// Create express app
const app = express();
const errorHandler = require('./middleware/errorHandler');

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes); 
app.use(errorHandler);

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});