import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  getTodos,
  createTodo,
  updateTodo,
  reorderTodos,
  deleteTodo,
} from "../services/api";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";

function Home() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark"
  );
  const userName = localStorage.getItem("userName") || "User";

  // Redirect if not logged in
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  // Apply theme
  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Load todos on mount
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const { data } = await getTodos();
      setTodos(data);
    } catch (err) {
      console.error("Failed to fetch todos:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (todoData) => {
    try {
      const { data } = await createTodo(todoData);
      setTodos((prev) => [...prev, data]);
    } catch (err) {
      console.error("Failed to add todo:", err);
    }
  };

  const handleToggle = async (id, completed) => {
    try {
      const { data } = await updateTodo(id, { completed });
      setTodos((prev) => prev.map((t) => (t._id === id ? data : t)));
    } catch (err) {
      console.error("Failed to update todo:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Failed to delete todo:", err);
    }
  };

  const handleReorder = async (newOrder) => {
    setTodos(newOrder);
    try {
      await reorderTodos(newOrder.map((t) => t._id));
    } catch (err) {
      console.error("Failed to reorder:", err);
      fetchTodos(); // rollback
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div className="w-full max-w-[540px] mx-auto">
      {/* Navbar */}
      <nav className="flex items-center justify-between mb-5 px-4 py-3 bg-surface border-[1.5px] border-border rounded-[10px] light:bg-white light:border-gray-200">
        <span className="text-sm font-medium text-[#e8e8f0] light:text-gray-700">
          👋 {userName}
        </span>
        <div className="flex items-center gap-2">
          <Link
            to="/profile"
            className="text-sm text-[#8888a8] hover:text-accent transition-colors no-underline light:text-gray-500"
          >
            Profile
          </Link>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="bg-transparent border-[1.5px] border-border text-sm px-2.5 py-1.5 rounded-lg cursor-pointer transition-all duration-200 hover:border-accent light:border-gray-200"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
          <button
            onClick={handleLogout}
            className="bg-transparent border-[1.5px] border-border text-[#8888a8] text-[0.85rem] font-medium px-3.5 py-1.5 rounded-lg cursor-pointer transition-all duration-200 hover:text-[var(--color-danger)] hover:border-[var(--color-danger)] hover:bg-red-500/10 light:border-gray-200 light:text-gray-500"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Header */}
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-br from-accent to-purple-400 bg-clip-text text-transparent">
          📝 To-Do List
        </h1>
        {todos.length > 0 && (
          <p className="mt-2 text-sm text-[#8888a8] font-medium light:text-gray-500">
            {completedCount} of {todos.length} completed
          </p>
        )}
      </header>

      <TodoForm onAdd={handleAdd} />

      {loading ? (
        <div className="text-center py-12 text-[#8888a8]">
          <div className="w-8 h-8 border-3 border-border border-t-accent rounded-full mx-auto mb-4 animate-spin"></div>
          <p>Loading tasks…</p>
        </div>
      ) : (
        <TodoList
          todos={todos}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onReorder={handleReorder}
        />
      )}
    </div>
  );
}

export default Home;
