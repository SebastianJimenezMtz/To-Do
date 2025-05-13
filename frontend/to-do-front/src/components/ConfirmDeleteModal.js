import React from 'react';
import './ConfirmDeleteModal.css';

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="confirm-delete-modal-overlay">
      <div className="confirm-delete-modal">
        <h3>{title || 'Confirm Deletion'}</h3>
        <p>{message || 'Are you sure you want to delete this item?'}</p>
        <div className="confirm-delete-modal-buttons">
          <button onClick={onConfirm} className="confirm-delete-btn-confirm">
            Aceptar
          </button>
          <button onClick={onClose} className="confirm-delete-btn-cancel">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
