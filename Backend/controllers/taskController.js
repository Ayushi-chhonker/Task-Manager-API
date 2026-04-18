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
        ...req.body,
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

  } catch (error) {

    res.status(500).json({
      message: "Error fetching tasks"
    });

  }
};

// function to Delete Task
exports.deleteTask = async (req, res) => {

  try {

    await taskService.deleteTask(
      req.params.id
    );

    res.json({
      message: "Task deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: "Error deleting task"
    });

  }
};
// function to Update Task
exports.updateTask = async (req, res) => {

  try {

    const updatedTask =
      await taskService.updateTask(
        req.params.id,
        req.body
      );

    res.json(updatedTask);

  }

  catch (error) {

    res.status(500).json({
      message: "Error updating task"
    });

  }

};
//function to Search Tasks
exports.searchTasks = async (req, res) => {

  try {

    // Get keyword from query
    const keyword = req.query.keyword;

    // Call service
    const tasks =
      await taskService.searchTasks(
        req.user,
        keyword
      );

    // Send response
    res.json(tasks);

  }

  catch (error) {

    console.log("Search Error:", error);

    res.status(500).json({
      message: "Error searching tasks"
    });

  }

};