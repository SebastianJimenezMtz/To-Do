import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

const AddListModal = ({ isOpen, onClose, onAddList }) => {
  const [listName, setListName] = useState('');

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle>Create New List</DialogTitle>
      <DialogContent>
        <TextField
          label="List Name"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          fullWidth
          autoFocus
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={() => { if(listName.trim()){ onAddList(listName.trim()); setListName(''); } }}
          variant="contained"
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddListModal;
