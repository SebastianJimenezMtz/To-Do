import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import TaskList from './components/TaskList';
import Login from './components/Login';

const generateId = () => `_${Math.random().toString(36).substr(2, 9)}`;

function App() {
  const [users, setUsers] = useState([]);
  const [lists, setLists] = useState([]);
  const [tasks, setTasks] = useState({});
  const [activeListId, setActiveListId] = useState(null);
  const [currentUser, setCurrentUser] = useState(null); // Initial state is null

  // Effect for loading initial data and handling current user
  useEffect(() => {
    let userObject = null;
    try {
      const storedCurrentUser = localStorage.getItem('currentUser');
      if (storedCurrentUser) {
        userObject = JSON.parse(storedCurrentUser);
      }
    } catch (error) {
      console.error("Failed to parse stored current user:", error);
      localStorage.removeItem('currentUser'); // Clear corrupted data
    }

    if (userObject && userObject.username) {
      setCurrentUser(userObject);
      loadAndInitializeUserData(userObject.username);
    } else {
      // No valid current user found, ensure login page is shown
      setCurrentUser(null);
      setLists([]);
      setTasks({});
      setActiveListId(null);
    }

    // Load all users (for login/register checks)
    try {
      const storedUsers = localStorage.getItem('todoUsers');
      if (storedUsers) {
        setUsers(JSON.parse(storedUsers));
      }
    } catch (error) {
      console.error("Failed to parse stored users:", error);
      localStorage.removeItem('todoUsers');
      setUsers([]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Runs once on mount

  const loadAndInitializeUserData = (username) => {
    if (!username) {
      console.error("loadAndInitializeUserData called with undefined username");
      // Ensure state is cleared if called with invalid username somehow
      setLists([]);
      setTasks({});
      setActiveListId(null);
      return;
    }

    const userListsKey = `todoLists_${username}`;
    const userTasksKey = `todoTasks_${username}`;
    const userActiveListIdKey = `activeListId_${username}`;
    let listsExist = false;

    try {
      const storedLists = localStorage.getItem(userListsKey);
      if (storedLists) {
        const parsedLists = JSON.parse(storedLists);
        if (parsedLists && parsedLists.length > 0) {
          setLists(parsedLists);
          listsExist = true;

          const storedTasks = localStorage.getItem(userTasksKey);
          if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
          } else {
            // If lists exist but tasks don't, initialize tasks for these lists
            const initialTasksForUser = {};
            parsedLists.forEach(list => {
              initialTasksForUser[list.id] = [];
            });
            setTasks(initialTasksForUser);
            localStorage.setItem(userTasksKey, JSON.stringify(initialTasksForUser));
          }

          const storedActiveListId = localStorage.getItem(userActiveListIdKey);
          if (storedActiveListId && parsedLists.find(l => l.id === storedActiveListId)) {
            setActiveListId(storedActiveListId);
          } else {
            setActiveListId(parsedLists[0].id); // Default to first list
          }
        }
      }
    } catch (error) {
      console.error(`Error loading data for user ${username}:`, error);
      localStorage.removeItem(userListsKey);
      localStorage.removeItem(userTasksKey);
      localStorage.removeItem(userActiveListIdKey);
      // listsExist remains false, will trigger initialization below
    }

    if (!listsExist) {
      console.log(`No lists found for user ${username} or error during load. Initializing default data.`);
      initializeDefaultData(username);
    }
  };

  const initializeDefaultData = (username) => {
    const initialLists = [];
    const initialTasks = {};
    const initialActiveListId = null;

    setLists(initialLists);
    setTasks(initialTasks);
    setActiveListId(initialActiveListId);

    localStorage.setItem(`todoLists_${username}`, JSON.stringify(initialLists));
    localStorage.setItem(`todoTasks_${username}`, JSON.stringify(initialTasks));
    if (initialActiveListId) {
      localStorage.setItem(`activeListId_${username}`, initialActiveListId);
    } else {
      localStorage.removeItem(`activeListId_${username}`);
    }
  };

  // Save users to localStorage
  useEffect(() => {
    // Only save if users array is not the initial empty array, to avoid overwriting on first load if empty
    if (users.length > 0 || localStorage.getItem('todoUsers')) {
        localStorage.setItem('todoUsers', JSON.stringify(users));
    }
  }, [users]);

  // Save lists, tasks, and activeListId to localStorage for the current user
  useEffect(() => {
    if (currentUser && currentUser.username) {
      // Avoid saving empty lists/tasks if they were just cleared due to logout or error
      if (lists.length > 0 || Object.keys(tasks).length > 0 || localStorage.getItem(`todoLists_${currentUser.username}`)) {
        localStorage.setItem(`todoLists_${currentUser.username}`, JSON.stringify(lists));
        localStorage.setItem(`todoTasks_${currentUser.username}`, JSON.stringify(tasks));
      }
      if (activeListId) {
        localStorage.setItem(`activeListId_${currentUser.username}`, activeListId);
      } else {
        // Only remove if it exists, to avoid unnecessary writes
        if(localStorage.getItem(`activeListId_${currentUser.username}`)) {
            localStorage.removeItem(`activeListId_${currentUser.username}`);
        }
      }
    }
  }, [lists, tasks, activeListId, currentUser]);

  const handleRegister = (userData) => {
    const existingUser = users.find(u => u.username === userData.username || u.email === userData.email);
    if (existingUser) {
      alert('Username or email already exists!');
      return false;
    }
    const newUser = { ...userData, id: generateId() };
    setUsers(prevUsers => [...prevUsers, newUser]);
    const newUserCredentials = { username: newUser.username, email: newUser.email };
    setCurrentUser(newUserCredentials);
    localStorage.setItem('currentUser', JSON.stringify(newUserCredentials));
    initializeDefaultData(newUser.username);
    return true;
  };

  const handleLogin = (credentials) => {
    const user = users.find(u => u.username === credentials.username && u.password === credentials.password);
    if (user) {
      const userCredentials = { username: user.username, email: user.email };
      setCurrentUser(userCredentials);
      localStorage.setItem('currentUser', JSON.stringify(userCredentials));
      loadAndInitializeUserData(user.username);
      return true;
    } else {
      alert('Invalid username or password');
      return false;
    }
  };

  const handleLogout = () => {
    const currentUsername = currentUser ? currentUser.username : null;
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    // Clear app state. User-specific data in localStorage remains but won't be loaded.
    setLists([]);
    setTasks({});
    setActiveListId(null);

    // Optional: Clear the specific user's activeListId from localStorage upon logout
    if (currentUsername) {
        localStorage.removeItem(`activeListId_${currentUsername}`);
    }
  };

  const handleAddList = (name) => {
    const newList = { id: generateId(), name };
    setLists(prevLists => [...prevLists, newList]);
    setTasks(prevTasks => ({ ...prevTasks, [newList.id]: [] }));
    setActiveListId(newList.id);
  };

  const handleDeleteList = (listIdToDelete) => {
    const wasActiveListDeleted = activeListId === listIdToDelete;

    // Filter out the list to be deleted
    const newLists = lists.filter(list => list.id !== listIdToDelete);
    setLists(newLists);

    // Remove tasks associated with the deleted list
    setTasks(prevTasks => {
      const updatedTasks = { ...prevTasks };
      delete updatedTasks[listIdToDelete];
      return updatedTasks;
    });

    // If the active list was the one deleted, update activeListId
    if (wasActiveListDeleted) {
      setActiveListId(newLists.length > 0 ? newLists[0].id : null);
    }
  };

  const handleAddTask = (taskData) => {
    const { listId, text, description, dueDate, priority } = taskData;
    if (!listId) return;
    const newTask = { id: generateId(), text, description: description || '', dueDate: dueDate || null, priority: priority || 2, completed: false };
    setTasks(prevTasks => ({
      ...prevTasks,
      [listId]: [...(prevTasks[listId] || []), newTask],
    }));
  };

  const handleToggleComplete = (taskId) => {
    setTasks(prevTasks => {
      const updatedTasks = { ...prevTasks };
      for (const listId in updatedTasks) {
        updatedTasks[listId] = updatedTasks[listId].map(task =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        );
      }
      return updatedTasks;
    });
  };

  const handleDeleteTask = (taskId) => {
    setTasks(prevTasks => {
      const updatedTasks = { ...prevTasks };
      for (const listId in updatedTasks) {
        updatedTasks[listId] = updatedTasks[listId].filter(task => task.id !== taskId);
      }
      return updatedTasks;
    });
  };

  const handleEditTask = (taskData) => {
    const { id, listId, text, description, dueDate, priority } = taskData;
    setTasks(prevTasks => {
      const updatedTasks = { ...prevTasks };
      updatedTasks[listId] = (updatedTasks[listId] || []).map(task =>
        task.id === id ? { ...task, text, description: description || '', dueDate: dueDate || null, priority: priority || 2 } : task
      );
      return updatedTasks;
    });
  };

  if (!currentUser) {
    return <Login onLogin={handleLogin} onRegister={handleRegister} />;
  }

  const activeList = lists.find(list => list.id === activeListId);
  const tasksForActiveList = activeListId && tasks[activeListId] ? tasks[activeListId] : [];

  return (
    <div className="App">
      <Sidebar
        user={currentUser}
        lists={lists}
        activeList={activeListId}
        setActiveList={setActiveListId}
        onAddList={handleAddList}
        onLogout={handleLogout}
        onDeleteList={handleDeleteList}
      />
      <TaskList
        list={activeList}
        tasks={tasksForActiveList}
        onAddTask={handleAddTask}
        onToggleComplete={handleToggleComplete}
        onDeleteTask={handleDeleteTask}
        onEditTask={handleEditTask}
      />
    </div>
  );
}

export default App;
