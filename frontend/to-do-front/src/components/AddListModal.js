import React, { useState } from 'react';
import './AddListModal.css';

const AddListModal = ({ isOpen, onClose, onAddList }) => {
  const [listName, setListName] = useState('');

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (listName.trim()) {
      onAddList(listName.trim());
      setListName('');
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Create New List</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter new list name"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            autoFocus
          />
          <div className="modal-actions">
            <button type="submit" className="primary-btn">Create</button>
            <button type="button" onClick={onClose} className="secondary-btn">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddListModal;
