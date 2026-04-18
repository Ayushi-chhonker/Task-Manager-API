# Task Manager Application
 Project Description

This project is a Task Manager Application developed using Node.js, Express.js, MongoDB, and React.js.

It allows users to:
- Register a new account
- Login securely using JWT authentication
- Create tasks
- View tasks
- Manage personal task data

The backend provides REST APIs, and the frontend is built using React to interact with those APIs.

---
 Technologies Used

 Backend:
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JSON Web Token (JWT)
- dotenv

 Frontend:
- React.js
- Vite
- Fetch API
- CSS

 Tools:
- Postman (API Testing)
- GitHub (Version Control)

---

 Folder Structure

project-folder/

│  
├── backend/  
│   ├── controllers/  
│   ├── models/  
│   ├── routes/  
│   ├── middleware/  
│   ├── config/  
│   ├── server.js  
│   ├── package.json  
│  
├── frontend/  
│   ├── src/  
│   ├── public/  
│   ├── index.html  
│   ├── package.json  
│  
├── README.md  
├── .gitignore  

---

 Features

 Authentication:
- User Registration
- User Login
- JWT Token Authentication

 Task Management:
- Create Task
- View Tasks
- Update Task
- Delete Task

---

 API Endpoints

 Authentication Routes

POST /api/auth/register  
Register new user

POST /api/auth/login  
Login user and generate token

---

Task Routes

GET /api/tasks  
Get all tasks

POST /api/tasks  
Create new task

PUT /api/tasks/:id  
Update task

DELETE /api/tasks/:id  
Delete task

---

 How to Run Backend

1 Open backend folder:

cd backend

2 Install dependencies:

npm install

3 Create .env file and add:

MONGO_URI=your_mongodb_connection_string  
PORT=5000  

4 Run backend:

npm run dev

Backend will run on:

http://localhost:5000

---

 How to Run Frontend

1. Open frontend folder:

cd frontend

2. Install dependencies:

npm install

3. Run frontend:

npm run dev

Frontend will run on:

http://localhost:5173

---

 Database Used

MongoDB Atlas

Collections:

Users Collection:
- name
- email
- password

Tasks Collection:
- title
- description
- user

---

 Testing

All APIs were tested using Postman before integrating with frontend.

---

Author

Name: Ayushi  
Project: Task Manager Application  
