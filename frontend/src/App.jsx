import axios from "axios";
import { useState, useEffect } from "react";
// import heroImg from "./assets/hero.png";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "./assets/vite.svg";
// import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const name = "Ashik";

  const addTodo = () => {
    if (!title.trim()) {
      return;
    }
    axios
      .post("http://localhost:5000/todos", {
        title: title,
      })
      .then((response) => {
        setTodos([...todos, response.data]);
        setMessage("Todo added successfully");
        setTitle("");
        setTimeout(()=>{
          setMessage("");
        },3000);
      });
  };

  const updateTodo = () => {
    axios
      .put(`http://localhost:5000/todos/${editId}`, {
        title: title,
      })
      .then((response) => {
        const updatedTodo = response.data;

        setTodos(
          todos.map((todo) => {
            return todo._id === editId ? updatedTodo : todo;
          })
        );
        setTitle("");
        setEditIndex(null);
        setEditId(null);
        setMessage("Todo updated successfully");
        setTimeout(()=>{
          setMessage("");
        },3000);
      });
  };

  const completeTodo = (todo) => {
    axios
      .put(`http://localhost:5000/todos/${todo._id}/complete`, {
        completed: !todo.completed,
      })
      .then((response) => {
        console.log("Success:", response.data);

        const updatedTodo = response.data;

        setTodos((prevTodos) =>
          prevTodos.map((item) => {
            return item._id === todo._id ? updatedTodo : item;
          })
        );
        setMessage(updatedTodo.completed ? "Todo marked as completed!" : "Todo moved to pending!");
        setTimeout(()=>{
          setMessage("");
        },3000);
      })
      .catch((error) => {
        console.log(error);
        console.log("Response:", error.response?.data);
      });
  };

  const deleteTodo = (id) => {
    axios.delete(`http://localhost:5000/todos/${id}`).then(() => {
      setTodos(todos.filter((todo) => todo._id !== id));
      setMessage("Todo deleted successfully");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    });
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/todos")
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.log(error);
        setError("Failed to load tasks.Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-slate-800">
          Todo Apps
        </h1>
        {message && (
          <div className="mt-4 bg-green-100 text-green-700 p-3 rounded-lg text-center">{message}</div>
        )}
        <p className="text-center text-slate-500 mt-2">
          Manage your daily tasks
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <input
            type="text"
            placeholder="Enter your task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring"
          />
          <button
            onClick={editIndex !== null ? updateTodo : addTodo}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            {editIndex !== null ? "Update Todo" : "Add Todo"}
          </button>
        </div>

        <div className="mt-8 space-y-3">
          {error && (
            <p className="text-center text-red-600 bg-red-50 p-3 rounded-lg mt-4">
              {error}
            </p>
          )}
          {loading ? (
            <p className="text-center text-blue-600 mt-8"> Loading tasks...</p>
          ) : todos.length === 0 ? (
            <p className="text-center text-slate-400 mt-8">
              No tasks yet. Add your first task!
            </p>
          ) : (
            todos.map((todo, index) => (
              <div
                key={todo._id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-slate-50 border border-slate-200 rounded-xl p-4"
              >
                <div>
                  <p
                    className={`font-medium ${
                      todo.completed
                        ? "line-through text-slate-400"
                        : "text-slate-800"
                    }`}
                  >
                    {todo.title}
                  </p>
                  <p
                    className={`text-xs font-semibold ${
                      todo.completed ? "text-green-600" : "text-orange-500"
                    }`}
                  >
                    {todo.completed ? "Completed" : "Pending"}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditIndex(index);
                      setEditId(todo._id);
                      setTitle(todo.title);
                    }}
                    className="bg-green-100 text-blue-700 px-3 py-2 rounded-lg"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTodo(todo._id)}
                    className="bg-red-100 text-red-700 px-3 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => completeTodo(todo)}
                    className="bg-blue-100 text-blue-700 px-3 py-2 rounded-lg"
                  >
                    {todo.completed ? "Undo" : "Complete"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
