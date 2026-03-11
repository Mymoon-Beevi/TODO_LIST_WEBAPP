# To-Do List App

Full-stack To-Do List with **JWT authentication**, **Due Dates**, **Priority**, **Drag & Drop Reordering**, and **Dark Mode**.  
Built with React (Vite + Tailwind CSS v4), Node.js (Express), and MongoDB (Mongoose).

## Features

- 🔐 **Secure Auth**: JWT based registration and login.
- 📅 **Smart Tasks**: Add due dates and priority levels (Low, Medium, High).
- 🖱️ **Drag & Drop**: Reorder your tasks naturally with `@dnd-kit`.
- 🌓 **Themes**: Seamless Dark/Light mode toggle.
- 👤 **User Profile**: Manage your account details and password.
- 📱 **Responsive**: Fully optimized for mobile and desktop.

## Folder Structure

```
to-do list app/
├── backend/
│   ├── config/db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── todoController.js
│   │   └── profileController.js
│   ├── middleware/authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Todo.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── todoRoutes.js
│   │   └── profileRoutes.js
│   ├── server.js
│   └── .env
└── frontend/
    └── src/
        ├── components/
        │   ├── TodoForm.jsx
        │   ├── TodoItem.jsx
        │   └── TodoList.jsx
        ├── pages/
        │   ├── Home.jsx
        │   ├── Login.jsx
        │   ├── Register.jsx
        │   └── Profile.jsx
        ├── services/api.js
        ├── App.jsx
        ├── main.jsx
        └── index.css
```

## Running Locally

### 1. Backend

```bash
cd backend
npm install
npm run dev
```

Edit `.env`:
```
MONGO_URL=your_mongodb_connection_string
PORT=5001
JWT_SECRET=your_secret_key
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

The app will open at `http://localhost:5173`.

## Deployment

Refer to the [Deployment Guide](file:///C:/Users/ADMIIN/.gemini/antigravity/brain/d6734e57-e604-4642-a341-391a0954372a/deployment_guide.md) for step-by-step instructions on deploying to Railway.
