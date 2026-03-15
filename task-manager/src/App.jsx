import { useState, useEffect } from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import './App.css';

function App({ signOut, user }) {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", description: "" });

  const userId = user.attributes?.sub || user.username;
  const API_URL = "your_api_gateway_url_here";

  useEffect(() => {
    fetch(`${API_URL}?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setTasks(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, [userId]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!taskName.trim()) return;
    const newTask = {
      userId,
      taskId: Date.now().toString(),
      name: taskName,
      description: taskDesc,
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTasks([newTask, ...tasks]);
    setTaskName(""); setTaskDesc("");
    await fetch(API_URL, { method: 'POST', body: JSON.stringify(newTask) });
  };

  const toggleTask = async (task) => {
    const original = task.completed;
    setTasks(tasks.map(t => t.taskId === task.taskId ? { ...t, completed: !original } : t));
    await fetch(API_URL, { method: 'PUT', body: JSON.stringify({ userId, taskId: task.taskId, completed: !original }) });
  };

  const saveEdit = async (taskId) => {
    setTasks(tasks.map(t => t.taskId === taskId ? { ...t, ...editForm } : t));
    await fetch(API_URL, { method: 'PUT', body: JSON.stringify({ userId, taskId, ...editForm }) });
    setEditMode(null);
  };

  const handleDelete = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    const prevTasks = tasks;
    setTasks(tasks.filter(t => t.taskId !== taskId));
    const response = await fetch(`${API_URL}?userId=${userId}&taskId=${taskId}`, { method: 'DELETE' });
    if (!response.ok) { setTasks(prevTasks); alert("Delete failed"); }
  };

  // Sort tasks by date (newest first)
  const sortedTasks = [...tasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const handleAiDecompose = async (task) => {
    // Replace this with your actual API Gateway URL
    const API_URL = "your_api_gateway_url_here2"; // my key

    try {
      // Show a temporary loading state if you'd like
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          taskName: task.name,
          taskDesc: task.description || "No description provided"
        })
      });

      const data = await response.json();

      // Update the task with the AI-generated sub-tasks
      // This assumes you have an 'updateTask' function already
      updateTask(task.taskId, {
        ...task,
        description: `AI Breakdown:\n${data.aiSuggestion}`
      });
    } catch (err) {
      console.error("AI Magic failed:", err);
      alert("Could not connect to the AI engine. Check your API Gateway URL!");
    }
  };
  return (
    <div className="app-container">
      <div className="task-card">
        <header className="auth-header">
          <span>Hello, <strong>{user.username}</strong></span>
          <button onClick={signOut} className="add-btn" style={{ backgroundColor: '#ef4444' }}>Sign Out</button>
        </header>

        <h1>My Tasks</h1>
        <form onSubmit={handleAddTask} className="task-form">
          <input className="task-input" value={taskName} onChange={(e) => setTaskName(e.target.value)} placeholder="Title" />
          <textarea className="task-input" value={taskDesc} onChange={(e) => setTaskDesc(e.target.value)} placeholder="Description..." />
          <button type="submit" className="add-btn">Add Task</button>
        </form>

        {loading ? <p>Loading your tasks...</p> : (
          <ul className="task-list">
            {sortedTasks.map((task) => (
              <li key={task.taskId} className="task-item">
                {editMode === task.taskId ? (
                  <div className="edit-mode">
                    <input value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })} />
                    <textarea value={editForm.description} onChange={e => setEditForm({ ...editForm, description: e.target.value })} />
                    <button onClick={() => saveEdit(task.taskId)}>Save</button>
                    <button onClick={() => setEditMode(null)}>Cancel</button>
                  </div>
                ) : (
                  <>
                    <input type="checkbox" checked={task.completed || false} onChange={() => toggleTask(task)} />
                    <div className="task-info" onClick={() => { setEditMode(task.taskId); setEditForm({ name: task.name, description: task.description }); }}>
                      <strong style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.name}</strong>
                      <p>{task.description}</p>
                      <small>{new Date(task.createdAt).toLocaleDateString()}</small>
                    </div>
                    <button onClick={() => handleDelete(task.taskId)} className="delete-btn">🗑️</button>
                    <button
                      className="ai-magic-btn"
                      onClick={() => handleAiDecompose(task)}
                    >
                      🪄 AI Magic
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default withAuthenticator(App);