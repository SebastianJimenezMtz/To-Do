import React, { useState } from 'react';
import AddListModal from './AddListModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';

const Sidebar = ({ user, lists, activeList, setActiveList, onAddList, onLogout, onDeleteList }) => {
  const [isAddListModalOpen, setIsAddListModalOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);
  const [listToDelete, setListToDelete] = useState(null);

  const handleAddListClick = () => {
    setIsAddListModalOpen(true);
  };

  const handleCloseAddListModal = () => {
    setIsAddListModalOpen(false);
  };

  const handleConfirmAddList = (listName) => {
    onAddList(listName);
    setIsAddListModalOpen(false);
  };

  const handleDeleteListClick = (listId, listName) => {
    setListToDelete({ id: listId, name: listName });
    setIsConfirmDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (listToDelete) {
      onDeleteList(listToDelete.id);
    }
    setIsConfirmDeleteModalOpen(false);
    setListToDelete(null);
  };

  const handleCloseConfirmDeleteModal = () => {
    setIsConfirmDeleteModalOpen(false);
    setListToDelete(null);
  };

  return (
    <aside className="sidebar">
      <div className="user-profile-section">
        <div className="user-details">
          <div className="user-avatar"></div>
          <div className="user-info">
            <h4>{user.username || 'User'}</h4>
            <p>{user.email || 'user@example.com'}</p>
          </div>
        </div>
        <button onClick={onLogout} className="logout-btn">Logout</button>
      </div>
      <nav className="lists-nav">
        <ul>
          {lists.map((list) => (
            <li
              key={list.id}
              className={`${list.id === activeList ? 'active' : ''} list-item-container`}
              onClick={() => setActiveList(list.id)} // Added onClick handler
            >
              <span className="list-icon">☰</span>
              <span className="list-name">{list.name}</span>
              <button 
                onClick={() => handleDeleteListClick(list.id, list.name)} 
                className="delete-list-btn"
                title="Delete list"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <button className="create-list-btn" onClick={handleAddListClick}>
        <span className="create-list-icon">+</span> Create List
      </button>
      <AddListModal
        isOpen={isAddListModalOpen}
        onClose={handleCloseAddListModal}
        onAddList={handleConfirmAddList}
      />
      <ConfirmDeleteModal
        isOpen={isConfirmDeleteModalOpen}
        onClose={handleCloseConfirmDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        message={`Are you sure you want to delete the list "${listToDelete?.name || ''}" and all its tasks? This action cannot be undone.`}
      />
    </aside>
  );
};

export default Sidebar;
