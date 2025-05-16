import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Checkbox,
  IconButton,
  Chip,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { motion } from "framer-motion";
import { format } from "date-fns";

const TaskItem = ({ task, onToggleComplete, onDeleteTask, onEditTask }) => {
  const priorityColor = (priority) => {
    switch (priority) {
      case "Low":
        return "default";
      case "Medium":
        return "primary";
      case "High":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        sx={{
          mb: 1,
          bgcolor: task.IsCompleted
            ? "action.disabledBackground"
            : "background.paper",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "flex-start" }}>
            <Checkbox
              checked={task.IsCompleted}
              onChange={() => onToggleComplete(task.TaskID)}
            />
            <Box>
              <Typography
                variant="subtitle1"
                sx={{
                  textDecoration: task.IsCompleted ? "line-through" : "none",
                }}
              >
                {task.Title}
              </Typography>
              {task.Description && (
                <Typography variant="body2" color="text.secondary">
                  {task.Description}
                </Typography>
              )}
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}
              >
                {task.DueDate && (
                  <Chip
                    label={format(new Date(task.DueDate), "PPP p")}
                    size="small"
                    color="info"
                  />
                )}
                <Chip
                  label={task.Priority}
                  size="small"
                  color={priorityColor(task.Priority)}
                />
              </Box>
            </Box>
          </Box>
          <Box>
            <IconButton onClick={() => onEditTask(task)} size="small">
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton onClick={() => onDeleteTask(task.TaskID)} size="small">
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TaskItem;
