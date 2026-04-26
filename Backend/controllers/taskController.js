const taskService = require("../services/taskService");


// create task
exports.createTask = async (req, res) => {

  try {

    const title = req.body.title;

    // check title
    if (!title) {

      return res.status(400).json({
        message: "title required"
      });

    }

    // create task with user id
    const task =
      await taskService.createTask({
        title: title,
        user: req.user
      });

    res.status(201).json(task);

  }

  catch (err) {

    console.log(err);

    res.status(500).json({
      message: "error creating task"
    });

  }

};



// get all tasks
exports.getTasks = async (req, res) => {

  try {

    const tasks =
      await taskService.getTasks(
        req.user
      );

    res.json(tasks);

  }

  catch (err) {

    console.log(err);

    res.status(500).json({
      message: "error getting tasks"
    });

  }

};



// delete task
exports.deleteTask = async (req, res) => {

  try {

    const id =
      req.params.id;

    await taskService.deleteTask(id);

    res.json({
      message: "task deleted"
    });

  }

  catch (err) {

    console.log(err);

    res.status(500).json({
      message: "error deleting task"
    });

  }

};



// update task
exports.updateTask = async (req, res) => {

  try {

    const id =
      req.params.id;

    const task =
      await taskService.updateTask(
        id,
        req.body
      );

    res.json(task);

  }

  catch (err) {

    console.log(err);

    res.status(500).json({
      message: "error updating task"
    });

  }

};



// search task
exports.searchTasks = async (req, res) => {

  try {

    const keyword =
      req.query.keyword || "";

    const tasks =
      await taskService.searchTasks(
        req.user,
        keyword
      );

    res.json(tasks);

  }

  catch (err) {

    console.log(err);

    res.status(500).json({
      message: "error searching task"
    });

  }

};



// update only status
exports.updateTaskStatus = async (req, res) => {

  try {

    const id =
      req.params.id;

    const status =
      req.body.status;

    // check status
    if (!status) {

      return res.status(400).json({
        message: "status required"
      });

    }

    const task =
      await taskService.updateTaskStatus(
        id,
        status
      );

    res.json(task);

  }

  catch (err) {

    console.log(err);

    res.status(500).json({
      message: "error updating status"
    });

  }

};