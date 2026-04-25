import { useState, useEffect } from "react";
import "./index.css";

import {
  registerUser,
  loginUser
} from "./services/authServices";

import {
  getTasks,
  createTaskService,
  updateTaskService,
  deleteTaskService,
  searchTaskService,
  updateTaskStatusService
} from "./services/taskServices";

function App() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);
  const [token, setToken] = useState("");

  const [editId, setEditId] = useState(null);

  // Load saved token
  useEffect(() => {

    const savedToken =
      localStorage.getItem("token");

    if (savedToken) {

      setToken(savedToken);
      loadTasks();

    }

  }, []);


// Register
const register = async () => {

  try {

    await registerUser({
      name,
      email,
      password
    });

    alert("User Registered Successfully");

  }

  catch (error) {

    alert(
      error.response?.data?.message ||
      "Registration Failed"
    );

  }

};


// Login
const login = async () => {

  try {

    const data =
      await loginUser({
        email: loginEmail,
        password: loginPassword
      });

    localStorage.setItem(
      "token",
      data.token
    );

    setToken(data.token);

    alert("Login Successful");

    await loadTasks();

  }

  catch (error) {

    alert(
      error.response?.data?.message ||
      "Login Failed"
    );

  }

};


// Load Tasks
const loadTasks = async () => {

  try {

    const data =
      await getTasks();

    setTasks(data);

  }

  catch (error) {

    console.log(error);

  }

};


// Create / Update Task
const createTask = async () => {

  try {

    if (!title) {

      alert("Title required");
      return;

    }

    if (editId) {

      await updateTaskService(
        editId,
        { title }
      );

      alert("Task Updated");

    }

    else {

      await createTaskService({
        title
      });

      alert("Task Created");

    }

    setTitle("");
    setEditId(null);

    await loadTasks();

  }

  catch (error) {

    console.log(error);

  }

};


// Delete Task
const deleteTask = async (id) => {

  try {

    await deleteTaskService(id);

    alert("Task Deleted");

    await loadTasks();

  }

  catch (error) {

    console.log(error);

  }

};


// Edit Task
const editTask = (task) => {

  setTitle(task.title);
  setEditId(task._id);

};


// Toggle Status
const toggleComplete = async (task) => {

  try {

    const newStatus =
      task.status === "completed"
        ? "pending"
        : "completed";

    await updateTaskStatusService(
      task._id,
      { status: newStatus }
    );

    await loadTasks();

  }

  catch (error) {

    console.log(error);

  }

};


// Search Tasks
const searchTasks = async (keyword) => {

  try {

    if (keyword === "") {

      await loadTasks();
      return;

    }

    const data =
      await searchTaskService(
        keyword
      );

    setTasks(data);

  }

  catch (error) {

    console.log(error);

  }

};


// Logout
const logout = () => {

  localStorage.removeItem("token");

  setTasks([]);
  setToken("");

  window.location.reload();

};


  return (

<div className="container">

<h1>Manage your daily task efficiently</h1>

<button onClick={logout}>
Logout
</button>


<h3>Register</h3>

<input
placeholder="Name"
value={name}
onChange={(e) =>
setName(e.target.value)}
/>

<input
placeholder="Email"
value={email}
onChange={(e) =>
setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e) =>
setPassword(e.target.value)}
/>

<button onClick={register}>
Register
</button>


<h3>Login</h3>

<input
placeholder="Email"
value={loginEmail}
onChange={(e) =>
setLoginEmail(e.target.value)}
/>

<input
type="password"
placeholder="Password"
value={loginPassword}
onChange={(e) =>
setLoginPassword(e.target.value)}
/>

<button onClick={login}>
Login
</button>


<h3>Create Task</h3>

<input
type="text"
placeholder="Search tasks..."
onChange={(e) =>
searchTasks(e.target.value)}
/>

<input
placeholder="Task Title"
value={title}
onChange={(e) =>
setTitle(e.target.value)}
/>

<button onClick={createTask}>
{editId ? "Update Task" : "Create Task"}
</button>


<h3>Tasks</h3>

<ul>

{Array.isArray(tasks) &&

tasks.map((task) => (

<li key={task._id}>

<input
type="checkbox"
checked={
task.status === "completed"
}
onChange={() =>
toggleComplete(task)}
/>

{task.title}

<button
onClick={() =>
editTask(task)}
>
Edit
</button>

<button
onClick={() =>
deleteTask(task._id)}
>
Delete
</button>

</li>

))}

</ul>

</div>

);

}

export default App;