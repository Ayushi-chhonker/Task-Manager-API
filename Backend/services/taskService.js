const Task = require("../models/task");

// function to create new task
exports.createTask = async (taskData) => {

  return await Task.create(taskData);

};

// function to get all tasks of logged in user
exports.getTasks = async (userId) => {

  return await Task.find({
    user: userId
  });

};

// function to get single task by id
exports.getTaskById = async (taskId) => {

  return await Task.findById(taskId);

};

// function to update task
exports.updateTask = async (taskId, updatedData) => {

  return await Task.findByIdAndUpdate(
    taskId,
    updatedData,
    { new: true }
  );

};

// function to Delete Task
exports.deleteTask = async (taskId) => {

  return await Task.findByIdAndDelete(
    taskId
  );

};

// function to Search Tasks
exports.searchTasks = async (userId, keyword) => {

  return await Task.find({
    user: userId,
    
    // using regex to match search text
    title: { $regex: keyword, $options: "i" }
  });

};