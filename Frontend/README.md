 Task Manager Application

This is a simple Task Manager web application made using MERN stack.  
In this project, users can register, login, and manage their daily tasks.

The main purpose of this project is to understand how frontend and backend communicate using APIs and how authentication works using JWT token.


 Features

- User Registration
- User Login using JWT Authentication
- Create new tasks
- Update task title
- Delete tasks
- Mark task as completed using checkbox
- Search tasks
- Update task status
- Token stored in localStorage
- Loading message shown during API calls


# Technologies Used

 Frontend
- React.js
- Axios
- CSS

Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs


Folder Structure


 How to Run This Project

 Backend Setup

1 Go to backend folder

2 Install dependencies

3 Create `.env` file and add:

4 Start backend server


Frontend Setup

1 Go to frontend folder

2 Install dependencies

3 Start frontend


 API Endpoints Used

Authentication

- POST '/api/auth/register' → Register user  
- POST '/api/auth/login' → Login user  

 Tasks

- GET '/api/tasks' → Get all tasks  
- POST '/api/tasks' → Create task  
- PUT '/api/tasks/:id' → Update task  
- DELETE '/api/tasks/:id' → Delete task  
- GET '/api/tasks/search' → Search tasks  
- PUT '/api/tasks/:id/status' → Update task status  


What I Learned From This Project

- How JWT authentication works
- How middleware protects routes
- How to connect MongoDB with Node.js
- How frontend sends requests using Axios
- How CRUD operations work
- How to handle errors in APIs


Author

Name: Ayushi  
Course: B.Tech  
Project: Task Manager Application

