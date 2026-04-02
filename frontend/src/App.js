import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API = "http://127.0.0.1:8000/api/tasks/";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get(API);
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!title) return;
    await axios.post(API, { title });
    setTitle("");
    fetchTasks();
  };

  const toggleTask = async (task) => {
    await axios.put(`${API}${task.id}/`, {
      ...task,
      completed: !task.completed,
    });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API}${id}/`);
    fetchTasks();
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <header>
        <h1>Task Manager</h1>

        {/* ICON BUTTON */}
        <button className="icon-btn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "🌞" : "🌙"}
        </button>
      </header>

      <div className="input-section">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task..."
        />
        <button onClick={addTask}>Add</button>
      </div>

      <div className="task-container">
        {tasks.map((task) => (
          <div className="task-card" key={task.id}>
            <span
              className={task.completed ? "completed" : ""}
              onClick={() => toggleTask(task)}
            >
              {task.title}
            </span>

            <div className="actions">
              <button onClick={() => toggleTask(task)}>
                {task.completed ? "Undo" : "Done"}
              </button>
              <button className="delete" onClick={() => deleteTask(task.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;