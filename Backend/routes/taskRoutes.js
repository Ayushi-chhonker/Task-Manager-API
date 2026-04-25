// importing required modules
const express = require("express");
const router = express.Router();

// importing controller functions
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  searchTasks,
   updateTaskStatus 
} = require("../controllers/taskController");

// middleware for authentication
const authMiddleware = require("../middleware/authMiddleware");

//route to Search task
router.get("/search", authMiddleware, searchTasks);

// route to Get all tasks
router.get("/", authMiddleware, getTasks);

// route to Creating new task task
router.post("/", authMiddleware, createTask);

// route to Update task
router.put("/:id", authMiddleware, updateTask);

//route to update task status only
router.put("/:id/status", authMiddleware, updateTaskStatus);

//route to Delete task
router.delete("/:id", authMiddleware, deleteTask);

//exporting router
module.exports = router;