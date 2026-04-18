// Import mongoose
const mongoose = require("mongoose");

// Function to connect database
const connectDB = async () => {
  try {
    // Connect using MONGO_URI from .env
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.log("Database connection error:", error);
    process.exit(1);
  }
};

// Export function
module.exports = connectDB;