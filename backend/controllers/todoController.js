const Todo = require("../models/Todo");

// GET /todos — Return todos for the logged-in user (sorted by order)
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.userId }).sort({
      order: 1,
      createdAt: -1,
    });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /todos — Create a new todo for the logged-in user
const createTodo = async (req, res) => {
  try {
    const { title, dueDate, priority } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Title is required" });
    }

    // Get the highest order number to put new todo at end
    const lastTodo = await Todo.findOne({ userId: req.user.userId }).sort({
      order: -1,
    });
    const nextOrder = lastTodo ? lastTodo.order + 1 : 0;

    const todo = await Todo.create({
      title: title.trim(),
      dueDate: dueDate || null,
      priority: priority || "low",
      order: nextOrder,
      userId: req.user.userId,
    });
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /todos/:id — Update a todo (only if owned by user)
const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    const { completed, title, dueDate, priority } = req.body;

    if (completed !== undefined) todo.completed = completed;
    if (title !== undefined) todo.title = title.trim();
    if (dueDate !== undefined) todo.dueDate = dueDate;
    if (priority !== undefined) todo.priority = priority;

    const updated = await todo.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /todos/reorder — Reorder todos
const reorderTodos = async (req, res) => {
  try {
    const { orderedIds } = req.body;

    if (!Array.isArray(orderedIds)) {
      return res.status(400).json({ message: "orderedIds array is required" });
    }

    const bulkOps = orderedIds.map((id, index) => ({
      updateOne: {
        filter: { _id: id, userId: req.user.userId },
        update: { order: index },
      },
    }));

    await Todo.bulkWrite(bulkOps);
    res.json({ message: "Reordered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /todos/:id — Delete a todo (only if owned by user)
const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    await todo.deleteOne();
    res.json({ message: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTodos, createTodo, updateTodo, reorderTodos, deleteTodo };
