import API_URL from '../apiConfig';

const API_BASE_URL = API_URL;

const authHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Helper para manejar fetch y errores
const handleFetch = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      const errorText = await response.text(); // leer aunque no sea JSON
      throw new Error(`Error ${response.status}: ${errorText || response.statusText}`);
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    }

    return null; // En caso de respuestas vacías
  } catch (error) {
    console.error(`🔴 Fetch error at ${url}:`, error);
    throw error;
  }
};

// --- AUTH ---

export const login = (credentials) =>
  handleFetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

export const register = (userData) =>
  handleFetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

// --- LISTS ---

export const fetchUserLists = () =>
  handleFetch(`${API_BASE_URL}/taskList`, {
    headers: { ...authHeaders() },
  });

export const addList = (title) =>
  handleFetch(`${API_BASE_URL}/taskList`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify({ title }),
  });

export const deleteList = (listId) =>
  handleFetch(`${API_BASE_URL}/taskList/${listId}`, {
    method: "DELETE",
    headers: { ...authHeaders() },
  });

// --- TASKS ---

export const fetchUserTasks = (taskListId) =>
  handleFetch(`${API_BASE_URL}/taskList/${taskListId}/tasks`, {
    headers: { ...authHeaders() },
  });

export const addTask = (taskData) =>
  handleFetch(`${API_BASE_URL}/taskList/${taskData.ListID}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(taskData),
  });

export const toggleTaskComplete = (taskId) =>
  handleFetch(`${API_BASE_URL}/tasks/${taskId}/toggle`, {
    method: "PATCH",
    headers: { ...authHeaders() },
  });

export const deleteTask = (taskId) =>
  handleFetch(`${API_BASE_URL}/tasks/${taskId}`, {
    method: "DELETE",
    headers: { ...authHeaders() },
  });

export const editTask = (taskId, taskData) =>
  handleFetch(`${API_BASE_URL}/tasks/${taskId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(taskData),
  });
