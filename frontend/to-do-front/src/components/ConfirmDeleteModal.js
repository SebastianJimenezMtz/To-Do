import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button } from '@mui/material';

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{title || 'Confirm Deletion'}</DialogTitle>
      <DialogContent>
        <Typography>{message || 'Are you sure you want to delete this item?'}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="error" onClick={onConfirm} variant="contained">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteModal;
