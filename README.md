# MERN Todo App

A full-stack Todo Application built using the MERN stack. This application allows users to create, view, edit, delete, and manage daily tasks with completed and pending status.

## Features

- Create new Todos
- View all Todos
- Edit existing Todos
- Delete Todos
- Mark Todos as Completed or Pending
- Loading and error handling
- Success notifications
- Responsive UI for mobile and desktop

## Technologies Used

**Frontend:**
- React.js
- Vite
- Tailwind CSS
- Axios

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose

## Project Structure

```text
todo-app/
├── backend/
│   ├── models/
│   │   └── Todo.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
└── .gitignore
```

## Installation and Setup

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd todo-app
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder:

```env
MONGO_URL=your_mongodb_connection_string
```

Start the backend:

```bash
npm run dev
```

### 3. Frontend setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL provided by Vite in your browser.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/todos` | Get all Todos |
| POST | `/todos` | Create a Todo |
| PUT | `/todos/:id` | Update Todo |
| PUT | `/todos/:id/complete` | Toggle completion status |
| DELETE | `/todos/:id` | Delete a Todo |

## Author

**Ashik Kumar**

GitHub: Add your GitHub profile link here.
