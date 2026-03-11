const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  getTodos,
  createTodo,
  updateTodo,
  reorderTodos,
  deleteTodo,
} = require("../controllers/todoController");

// All todo routes are protected
router.use(authMiddleware);

router.get("/", getTodos);
router.post("/", createTodo);
router.put("/reorder", reorderTodos);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

module.exports = router;
