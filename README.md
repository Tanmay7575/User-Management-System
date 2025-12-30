# User-Management-System
📌 Project Overview

The User Management System is a full-stack web application designed to manage user accounts securely with authentication and role-based authorization. The system supports Admin and User roles, allowing administrators to manage users while regular users can manage their own profiles.

This project demonstrates backend API development, secure authentication, role-based access control (RBAC), frontend integration, and cloud deployment.
🛠 Tech Stack
Backend
Node.js
Express.js
MongoDB Atlas
JWT (JSON Web Tokens)
bcrypt for password hashing

Frontend
React (Hooks)
React Router DOM
Axios
Tailwind CSS

Deployment
Backend: Render
Frontend: Vercel
Database: MongoDB Atlas

Project Structure:

user-management-system/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── services/
│   ├── tests/
│   ├── app.js
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── context/
│   │   ├── services/
│   │   └── App.jsx
│   └── vite.config.js
│
├── postman/
│   └── User_Management_System.postman_collection.json
│
├── README.md
└── .gitignore
Backend .env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=https://your-frontend.vercel.app

Frontend .env
VITE_API_BASE_URL=https://your-backend.onrender.com

🧩 Backend Setup
cd backend
npm install
npm run dev

Frontend Setup
cd frontend
npm install
npm run dev

🔐 Authentication & Authorization

JWT-based authentication
Password hashing using bcrypt
Protected routes with middleware
Role-based access control:
 Admin → Manage users
 User → Manage own profile




