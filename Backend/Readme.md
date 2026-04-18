 Task Manager API

 Project Description
This project is a Task Manager API built using Node.js, Express.js, and MongoDB.  
It allows users to register, login, and manage their tasks.

 Features
- User Registration
- User Login using JWT Authentication
- Create Task
- View Tasks
- Update Task
- Delete Task

 Technologies Used
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Postman (for testing)

 Folder Structure
project/
│
├── controllers/
├── models/
├── routes/
├── middleware/
├── config/
├── frontend/
├── server.js
├── package.json

## API Endpoints

 Auth APIs
POST /api/auth/register  
POST /api/auth/login  

 Task APIs
GET /api/tasks  
POST /api/tasks  
PUT /api/tasks/:id  
DELETE /api/tasks/:id  

 How to Run Project

1. Install dependencies:
npm install

2. Create .env file and add:
MONGO_URI=mongodb+srv://admin:admin2917@cluster0.yqvvoed.mongodb.net/task-manager
port=5000 
JWT_SECRET=taskmanagersecret123  

3. Run server:
npm run dev

## Author
Ayushi chhonker