import { useState, useEffect } from "react";
import "./index.css";

function App() {

  useEffect(() => {

  const savedToken =
    localStorage.getItem("token");

  if (savedToken) {

    setToken(savedToken);

    getTasks(savedToken);

  }

}, []);

  const API = "http://localhost:5000/api";

     // Register states
  const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

// Login states
const [loginEmail, setLoginEmail] = useState("");
const [loginPassword, setLoginPassword] = useState("");

//task states
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);
  const [token, setToken] = useState("");

  const [editId, setEditId] = useState(null);

  // Register
  const register = async () => {

  try {

    const response = await fetch(
      `${API}/auth/register`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          name,
          email,
          password
        })

      }
    );

    const data = await response.json();

    if (response.ok) {

      alert("User Registered Successfully");

    } else {

      alert(data.message);

    }

  }

  catch (error) {

    alert("Registration Failed");

  }

};

  // Login
const login = async () => {

  try {

    const response = await fetch(
      `${API}/auth/login`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword
        })

      }
    );

    const data = await response.json();

    // Check login success
    if (response.ok) {

      // Save token correctly
      localStorage.setItem("token", data.token);

      setToken(data.token);

      alert("Login Successful");

      getTasks(data.token);

    } else {

      alert(data.message || "Login Failed");

    }

  }

  catch (error) {

    console.log(error);

    alert("Login Failed");

  }

};
  // Get Tasks
 const getTasks = async (savedToken) => {

  try {

    const response = await fetch(
      `${API}/tasks`,
      {

        headers: {

          Authorization:
          `Bearer ${savedToken || token}`

        }

      }
    );

    const data = await response.json();

    console.log("Fetched Tasks:", data); // ⭐ add this

    setTasks(data);

  }

  catch (error) {

    console.log(error);

  }

};
// function to create or update task
const createTask = async () => {

  try {

    let url = `${API}/tasks`;

    let method = "POST";

    // If editing
    if (editId) {

      url = `${API}/tasks/${editId}`;

      method = "PUT";

    }

    const response = await fetch(
      url,
      {

        method: method,

        headers: {

          "Content-Type": "application/json",

          Authorization:
          `Bearer ${token}`

        },

        body: JSON.stringify({
          title: title
        })

      }
    );

    if (response.ok) {

      setTitle("");

      setEditId(null);

      await getTasks(token);

    }

  }

  catch (error) {

    console.log(error);

  }

};
//function to delete task
const deleteTask = async (id) => {

  try {

    const response = await fetch(
      `${API}/tasks/${id}`,
      {

        method: "DELETE",

        headers: {

          Authorization:
          `Bearer ${token}`

        }

      }
    );

    if (response.ok) {

      // Refresh list
      await getTasks(token);

    }

  }

  catch (error) {

    console.log(error);

  }

};

const editTask = (task) => {

  setTitle(task.title);

  setEditId(task._id);

};
 
// function to mark task completed
const toggleComplete = async (task) => {

  try {

    const response = await fetch(
      `${API}/tasks/${task._id}`,
      {

        method: "PUT",

        headers: {

          "Content-Type": "application/json",

          Authorization:
          `Bearer ${token}`

        },

        body: JSON.stringify({

          completed: !task.completed

        })

      }
    );

    if (response.ok) {

      await getTasks(token);

    }

  }

  catch (error) {

    console.log(error);

  }

};
// function to search tasks
const searchTasks = async (keyword) => {

  try {

    // If search empty → show all
    if (keyword === "") {

      await getTasks(token);
      return;

    }

    const response = await fetch(
      `${API}/tasks/search?keyword=${keyword}`,
      {

        method: "GET",

        headers: {

          Authorization:
          `Bearer ${token}`

        }

      }
    );

    if (response.ok) {

      const data =
        await response.json();

      setTasks(data);

    }

  }

  catch (error) {

    console.log(error);

  }

};
// function to logout user
const logout = () => {

  // Remove token
  localStorage.removeItem("token");

  // Clear tasks
  setTasks([]);

  // Reload page
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
  onChange={(e) => setName(e.target.value)}
/>

<input
  placeholder="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

<input
  type="password"
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>

      <button type="button" onClick={register}>
        Register
      </button>

      <h3>Login</h3>

      <input
  placeholder="Email"
  value={loginEmail}
  onChange={(e) => setLoginEmail(e.target.value)}
/>

<input
  type="password"
  placeholder="Password"
  value={loginPassword}
  onChange={(e) => setLoginPassword(e.target.value)}
/>

      <button type="button" onClick={login}>
        Login
      </button>

      <h3>Create Task</h3>
      
      <input
  type="text"
  placeholder="Search tasks..."
  onChange={(e) =>
    searchTasks(e.target.value)
  }
/>

      <input
  placeholder="Task Title"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
      />

      <button type="button" onClick={createTask}>
        Create Task
      </button>

      <h3>Tasks</h3>
      
      <ul>

  {Array.isArray(tasks) &&

    tasks.map((task) => (

      <li
  key={task._id}
  className={
    task.completed
      ? "completed"
      : ""
  }
>

  <input
          type="checkbox"
          checked={task.completed}
          onChange={() =>
            toggleComplete(task)
          }
        />

        {task.title}

        <button
          onClick={() =>
            editTask(task)
          }
        >
          Edit
        </button>

        <button
          onClick={() =>
            deleteTask(task._id)
          }
        >
          Delete
        </button>

      </li>

    ))

  }

</ul>

    </div>

  );

}

export default App;