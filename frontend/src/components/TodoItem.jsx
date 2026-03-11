import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function TodoItem({ todo, onToggle, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: todo._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const isOverdue =
    todo.dueDate && !todo.completed && new Date(todo.dueDate) < new Date();

  const formatDate = (dateStr) => {
    if (!dateStr) return null;
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const priorityClass = {
    high: "priority-high",
    medium: "priority-medium",
    low: "priority-low",
  }[todo.priority || "low"];

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={`flex items-center justify-between px-3.5 py-3 bg-surface border-[1.5px] border-border rounded-[10px] transition-all duration-200 animate-slide-in hover:bg-surface-hover hover:border-[#3a3a5a] group light:bg-white light:border-gray-200 light:hover:bg-gray-50 ${
        todo.completed ? "opacity-70" : ""
      }`}
    >
      {/* Drag handle */}
      <button
        {...attributes}
        {...listeners}
        className="drag-handle mr-2 text-lg select-none light:text-gray-400 light:hover:text-gray-600"
        aria-label="Drag to reorder"
      >
        ⠿
      </button>

      {/* Checkbox + title */}
      <label className="flex items-center gap-3 cursor-pointer flex-1 min-w-0">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo._id, !todo.completed)}
          className="hidden"
        />
        <span className="checkmark"></span>
        <div className="flex flex-col gap-0.5 min-w-0">
          <span
            className={`text-[0.95rem] font-medium truncate transition-all duration-200 ${
              todo.completed
                ? "line-through text-[#8888a8]"
                : "text-[#e8e8f0] light:text-gray-800"
            }`}
          >
            {todo.title}
          </span>
          <div className="flex items-center gap-2 flex-wrap">
            {todo.priority && todo.priority !== "low" && (
              <span
                className={`text-[0.7rem] font-medium px-1.5 py-0.5 rounded border ${priorityClass}`}
              >
                {todo.priority}
              </span>
            )}
            {todo.dueDate && (
              <span
                className={`text-[0.7rem] font-medium ${
                  isOverdue ? "text-red-400" : "text-[#8888a8] light:text-gray-500"
                }`}
              >
                📅 {formatDate(todo.dueDate)}
                {isOverdue && " • overdue"}
              </span>
            )}
          </div>
        </div>
      </label>

      {/* Delete */}
      <button
        onClick={() => onDelete(todo._id)}
        aria-label="Delete todo"
        className="bg-transparent border-none text-[#8888a8] text-base cursor-pointer p-1.5 rounded-md transition-all duration-200 hover:text-[var(--color-danger)] hover:bg-red-500/10 opacity-0 group-hover:opacity-100 shrink-0"
      >
        ✕
      </button>
    </li>
  );
}

export default TodoItem;
