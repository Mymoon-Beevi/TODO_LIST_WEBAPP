import { useState } from "react";

function TodoForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("low");
  const [expanded, setExpanded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({
      title: title.trim(),
      dueDate: dueDate || null,
      priority,
    });
    setTitle("");
    setDueDate("");
    setPriority("low");
    setExpanded(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-5">
      <div className="flex gap-2.5">
        <input
          id="todo-input"
          type="text"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={() => setExpanded(true)}
          autoComplete="off"
          className="flex-1 px-4 py-3 bg-surface border-[1.5px] border-border rounded-[10px] text-[#e8e8f0] text-[0.95rem] font-[inherit] outline-none transition-all duration-200 placeholder:text-[#8888a8] focus:border-accent focus:shadow-[0_0_0_3px_var(--color-accent-glow)] light:text-gray-800 light:placeholder:text-gray-400"
        />
        <button
          id="add-btn"
          type="submit"
          className="px-6 py-3 bg-accent text-white font-semibold text-[0.95rem] rounded-[10px] cursor-pointer transition-all duration-200 hover:bg-accent-hover hover:shadow-[0_4px_18px_var(--color-accent-glow)] hover:-translate-y-px active:translate-y-0"
        >
          Add
        </button>
      </div>

      {expanded && (
        <div className="flex gap-3 mt-3 animate-slide-in">
          <div className="flex-1">
            <label className="block text-xs font-medium text-[#8888a8] mb-1 light:text-gray-500">
              Due Date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3 py-2 bg-surface border-[1.5px] border-border rounded-lg text-[#e8e8f0] text-sm font-[inherit] outline-none transition-all duration-200 focus:border-accent light:text-gray-800"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-medium text-[#8888a8] mb-1 light:text-gray-500">
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full px-3 py-2 bg-surface border-[1.5px] border-border rounded-lg text-[#e8e8f0] text-sm font-[inherit] outline-none transition-all duration-200 focus:border-accent light:text-gray-800"
            >
              <option value="low">🟢 Low</option>
              <option value="medium">🟡 Medium</option>
              <option value="high">🔴 High</option>
            </select>
          </div>
        </div>
      )}
    </form>
  );
}

export default TodoForm;
