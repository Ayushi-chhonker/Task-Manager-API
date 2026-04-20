import API from "./api";

// Get all tasks
export const getTasks = async () => {
  try {

    const response =
      await API.get("/tasks");

    return response.data;

  } catch (error) {

    console.error("Get Tasks Error:", error);

    throw error.response?.data || error.message;

  }
};


// Create task
export const createTask = async (taskData) => {
  try {

    const response =
      await API.post(
        "/tasks",
        taskData
      );

    return response.data;

  } catch (error) {

    console.error("Create Task Error:", error);

    throw error.response?.data || error.message;

  }
};


// Delete task
export const deleteTask = async (id) => {
  try {

    const response =
      await API.delete(
        `/tasks/${id}`
      );

    return response.data;

  } catch (error) {

    console.error("Delete Task Error:", error);

    throw error.response?.data || error.message;

  }
};


// Update task
export const updateTask = async (id, data) => {
  try {

    const response =
      await API.put(
        `/tasks/${id}`,
        data
      );

    return response.data;

  } catch (error) {

    console.error("Update Task Error:", error);

    throw error.response?.data || error.message;

  }
};