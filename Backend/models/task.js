const mongoose = require("mongoose");

// schema for storing task details in database
const taskSchema = new mongoose.Schema(
  {
    // title of the task (required)
    title: {
      type: String,
      required: true
    },
    // optional description of task
    description: {
      type: String
    },
     // to check whether task is completed or not
    completed: {
      type: Boolean,
      default: false
    },

    // storing user id to link task with user
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }

  },
  {
    // automatically adds createdAt and updatedAt
    timestamps: true
  }
);
// exporting task model
module.exports = mongoose.model("Task", taskSchema);