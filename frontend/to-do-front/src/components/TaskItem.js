import React from 'react';
import { Card, CardContent, Typography, Checkbox, IconButton, Chip, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

const TaskItem = ({ task, onToggleComplete, onDeleteTask, onEditTask }) => {
  const priorityLabel = (p) => (p === 1 ? 'Low' : p === 2 ? 'Medium' : 'High');
  const priorityColor = (p) => (p === 1 ? 'default' : p === 2 ? 'primary' : 'error');
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Card sx={{ mb: 1, bgcolor: task.completed ? 'action.disabledBackground' : 'background.paper' }}>
        <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <Checkbox
              checked={task.completed}
              onChange={() => onToggleComplete(task.id)}
            />
            <Box>
              <Typography variant="subtitle1" sx={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.text}
              </Typography>
              {task.description && (
                <Typography variant="body2" color="text.secondary">
                  {task.description}
                </Typography>
              )}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                {task.dueDate && (
                  <Chip label={format(new Date(task.dueDate), 'PPP p')} size="small" color="info" />
                )}
                <Chip
                  label={priorityLabel(task.priority)}
                  size="small"
                  color={priorityColor(task.priority)}
                />
              </Box>
            </Box>
          </Box>
          <Box>
            <IconButton onClick={() => onEditTask(task)} size="small">
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton onClick={() => onDeleteTask(task.id)} size="small">
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TaskItem;
