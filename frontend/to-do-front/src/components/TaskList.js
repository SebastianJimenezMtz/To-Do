import React, { useState } from 'react';
import { Fab, Box, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { motion } from 'framer-motion';
import TaskItem from './TaskItem';
import TaskModal from './TaskModal';

const TaskList = ({ list, tasks, onAddTask, onToggleComplete, onDeleteTask, onEditTask }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTaskData, setEditTaskData] = useState(null);

  const handleSaveTask = (taskData) => {
    if (taskData.id) onEditTask(taskData);
    else onAddTask(taskData);
    setIsModalOpen(false);
  };

  if (!list) {
    return (
      <div className="main-content">
        <p>Select a list to see tasks or create a new one.</p>
      </div>
    );
  }

  return (
    <Box component="main" sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">{list.name}</Typography>
        <Fab color="primary" onClick={() => { setEditTaskData(null); setIsModalOpen(true); }} size="small">
          <AddIcon />
        </Fab>
      </Box>
      <Box>
        {tasks.map((task) => (
          <motion.div key={task.id} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <TaskItem
              task={task}
              onToggleComplete={onToggleComplete}
              onDeleteTask={onDeleteTask}
              onEditTask={(t) => { setEditTaskData(task); setIsModalOpen(true); }}
            />
          </motion.div>
        ))}
      </Box>
      <TaskModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        initialData={editTaskData}
        listId={list.id}
      />
    </Box>
  );
};

export default TaskList;
