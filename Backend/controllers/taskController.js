const taskService = require("../services/taskService");


// function to create task
exports.createTask = async (req, res) => {

  try {

    console.log("User ID:", req.user);
    console.log("Task Body:", req.body);

    const { title } = req.body;

    // Validation
    if (!title) {

      return res.status(400).json({
        message: "Title is required"
      });

    }

    // adding user id to task
    const task =
      await taskService.createTask({
        title,
        user: req.user
      });

    res.status(201).json(task);

  }

  catch (error) {

    console.log("Create Task Error:", error);

    res.status(500).json({
      message: error.message
    });

  }

};


// function to Get Tasks
exports.getTasks = async (req, res) => {

  try {

    const tasks =
      await taskService.getTasks(
        req.user
      );

    res.json(tasks);

  }

  catch (error) {

    console.log("Get Tasks Error:", error);

    res.status(500).json({
      message: "Error fetching tasks"
    });

  }

};


// function to Delete Task
exports.deleteTask = async (req, res) => {

  try {

    const taskId =
      req.params.id;

    await taskService.deleteTask(
      taskId
    );

    res.json({
      message: "Task deleted"
    });

  }

  catch (error) {

    console.log("Delete Error:", error);

    res.status(500).json({
      message: "Error deleting task"
    });

  }

};


// function to Update Task
exports.updateTask = async (req, res) => {

  try {

    const taskId =
      req.params.id;

    const updatedTask =
      await taskService.updateTask(
        taskId,
        req.body
      );

    res.json(updatedTask);

  }

  catch (error) {

    console.log("Update Error:", error);

    res.status(500).json({
      message: "Error updating task"
    });

  }

};


// function to Search Tasks
exports.searchTasks = async (req, res) => {

  try {

    // Get keyword from query
    const keyword =
      req.query.keyword || "";

    // Call service
    const tasks =
      await taskService.searchTasks(
        req.user,
        keyword
      );

    res.json(tasks);

  }

  catch (error) {

    console.log("Search Error:", error);

    res.status(500).json({
      message: "Error searching tasks"
    });

  }

};


// function to Update Task Status Only
exports.updateTaskStatus = async (req, res) => {

  try {

    const taskId =
      req.params.id;

    const { status } =
      req.body;

    // check if status is sent
    if (!status) {

      return res.status(400).json({
        message: "Status is required"
      });

    }

    // call service
    const updatedTask =
      await taskService.updateTaskStatus(
        taskId,
        status
      );

    res.json(updatedTask);

  }

  catch (error) {

    console.log("Update Status Error:", error);

    res.status(500).json({
      message: "Error in updating task status"
    });

  }

};