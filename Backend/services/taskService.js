const Task = require("../models/task");

// create new task
exports.createTask = async (data) => {

  const task =
    await Task.create(data);

  return task;

};


// get all tasks of user
exports.getTasks = async (userId) => {

  const tasks =
    await Task.find({
      user: userId
    });

  return tasks;

};


// get single task
exports.getTaskById = async (id) => {

  const task =
    await Task.findById(id);

  return task;

};


// update task
exports.updateTask = async (id, data) => {

  const task =
    await Task.findByIdAndUpdate(
      id,
      data,
      { new: true }
    );

  return task;

};


// delete task
exports.deleteTask = async (id) => {

  await Task.findByIdAndDelete(id);

};


// search task
exports.searchTasks = async (userId, keyword) => {

  const tasks =
    await Task.find({
      user: userId,

      // search title text
      title: {
        $regex: keyword,
        $options: "i"
      }

    });

  return tasks;

};


// update only completed status
exports.updateTaskStatus = async (id, status) => {

  const task =
    await Task.findByIdAndUpdate(
      id,

      // IMPORTANT FIX: use completed not status
      { completed: status },

      { new: true }
    );

  if (!task) {

    throw new Error("task not found");

  }

  return task;

};