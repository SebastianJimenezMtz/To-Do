import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Box,
} from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

const priorities = [
  { value: 1, label: 'Low' },
  { value: 2, label: 'Medium' },
  { value: 3, label: 'High' },
];

const TaskModal = ({ open, onClose, onSave, initialData, listId }) => {
  const [text, setText] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const [priority, setPriority] = useState(2);

  useEffect(() => {
    if (initialData) {
      setText(initialData.text || '');
      setDescription(initialData.description || '');
      setDueDate(initialData.dueDate ? new Date(initialData.dueDate) : null);
      setPriority(initialData.priority || 2);
    } else {
      setText(''); setDescription(''); setDueDate(null); setPriority(2);
    }
  }, [initialData, open]);

  const handleSave = () => {
    if (!text.trim()) return;
    onSave({
      id: initialData?.id,
      listId,
      text: text.trim(),
      description: description.trim(),
      dueDate: dueDate ? dueDate.getTime() : null,
      priority,
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{initialData ? 'Edit Task' : 'New Task'}</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Title"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={3}
            fullWidth
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label="Due Date"
              value={dueDate}
              onChange={setDueDate}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>
          <TextField
            select
            label="Priority"
            value={priority}
            onChange={(e) => setPriority(Number(e.target.value))}
            fullWidth
          >
            {priorities.map((p) => (
              <MenuItem key={p.value} value={p.value}>{p.label}</MenuItem>
            ))}
          </TextField>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskModal;
