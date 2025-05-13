import React, { useState } from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ list, tasks, onAddTask, onToggleComplete, onDeleteTask, onEditTask }) => {
  const [newTaskText, setNewTaskText] = useState('');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTaskText.trim() === '') return;
    onAddTask(list.id, newTaskText.trim());
    setNewTaskText('');
  };

  if (!list) {
    return (
      <div className="main-content">
        <p>Select a list to see tasks or create a new one.</p>
      </div>
    );
  }

  return (
    <main className="main-content">
      <div className="task-list-header">
        <h1>{list.name}</h1>
        {/* Placeholder for other header controls like sorting or filtering */}
      </div>
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          className="add-task-input"
          placeholder="Add a new task..."
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
        />
        {/* Add button could be explicit, or rely on form submission */}
      </form>
      <div className="tasks-container">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleComplete={onToggleComplete}
            onDeleteTask={onDeleteTask}
            onEditTask={onEditTask}
          />
        ))}
      </div>
    </main>
  );
};

export default TaskList;
