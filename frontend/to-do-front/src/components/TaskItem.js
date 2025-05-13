import React, { useState } from 'react';

const TaskItem = ({ task, onToggleComplete, onDeleteTask, onEditTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleEdit = () => {
    if (isEditing && editText.trim() !== '') {
      onEditTask(task.id, editText.trim());
    }
    setIsEditing(!isEditing);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEdit();
    }
  };

  return (
    <div className="task-item">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggleComplete(task.id)}
      />
      <div className="task-item-details">
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyPress={handleKeyPress}
            onBlur={handleEdit} // Save when input loses focus
            className="edit-input"
            autoFocus
          />
        ) : (
          <span className={task.completed ? 'completed' : ''}>
            {task.text}
          </span>
        )}
        <div className="task-actions">
          <button onClick={handleEdit}>{isEditing ? 'Save' : 'Edit'}</button>
          <button onClick={() => onDeleteTask(task.id)}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
