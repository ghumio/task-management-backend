const Task = require("../models/Task");

// Create a new task
const createTask = async (req, res) => {
  const { title, description, completed = false } = req.body;

  // Validation
  if (!title || title.trim() === "") {
    return res.status(400).json({ message: "Task title is required" });
  }

  try {
    const task = new Task({
      title: title.trim(),
      description: description ? description.trim() : "",
      completed,
      user: req.user.id, // Attach user ID from auth middleware
    });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all tasks for the authenticated user
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }); // Filter by user ID
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a task by ID
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  // Validation
  if (title !== undefined && (!title || title.trim() === "")) {
    return res.status(400).json({ message: "Task title cannot be empty" });
  }

  try {
    const updates = {};
    if (title !== undefined) updates.title = title.trim();
    if (description !== undefined)
      updates.description = description ? description.trim() : "";
    if (completed !== undefined) updates.completed = completed;

    const task = await Task.findOneAndUpdate(
      { _id: id, user: req.user.id }, // Ensure user can only update their own tasks
      updates,
      { new: true } // Return the updated task
    );
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a task by ID
const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findOneAndDelete({ _id: id, user: req.user.id }); // Ensure user can only delete their own tasks
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Export all functions
module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};
