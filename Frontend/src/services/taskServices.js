import API from "./api";

// const API_URL = "http://localhost:5000/api/tasks";

const getToken = () => {
  return localStorage.getItem("token");
};

// Get all tasks
export const getTasks = async () => {

  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  return response.data;
};

// Create Task
export const createTask = async (taskData) => {

  const response = await axios.post(
    API_URL,
    taskData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

  return response.data;
};

// Delete task
export const deleteTask = async (id) => {

  const response = await axios.delete(
    `${API_URL}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

  return response.data;
};

// Update task
export const updateTask = async (id, data) => {

  const response = await axios.put(
    `${API_URL}/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

  return response.data;
};