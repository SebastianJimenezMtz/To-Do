const API_BASE_URL = "http://127.0.0.1:4050"; // Cambia si usas Azure u otro host

const authHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// --- AUTH ---

export const login = (credentials) =>
  fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

export const register = (userData) =>
  fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

// --- LISTS ---

export const fetchUserLists = () =>
  fetch(`${API_BASE_URL}/taskList`, {
    headers: {
      ...authHeaders(),
    },
  });

export const addList = (title) =>
  fetch(`${API_BASE_URL}/taskList`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify({ title }),
  });

export const deleteList = (listId) =>
  fetch(`${API_BASE_URL}/taskList/${listId}`, {
    method: "DELETE",
    headers: {
      ...authHeaders(),
    },
  });

// --- TASKS ---

export const fetchUserTasks = (taskListId) =>
  fetch(`${API_BASE_URL}/taskList/${taskListId}/tasks`, {
    headers: {
      ...authHeaders(),
    },
  });

export const addTask = (taskData) =>
  fetch(`${API_BASE_URL}/taskList/${taskData.ListID}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(taskData),
  });

export const toggleTaskComplete = (taskId) =>
  fetch(`${API_BASE_URL}/tasks/${taskId}/toggle`, {
    method: "PATCH",
    headers: {
      ...authHeaders(),
    },
  });

export const deleteTask = (taskId) =>
  fetch(`${API_BASE_URL}/tasks/${taskId}`, {
    method: "DELETE",
    headers: {
      ...authHeaders(),
    },
  });

export const editTask = (taskId, taskData) =>
  fetch(`${API_BASE_URL}/tasks/${taskId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(taskData),
  });
