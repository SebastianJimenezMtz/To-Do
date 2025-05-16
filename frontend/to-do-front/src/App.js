import React, { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";
import TaskItem from "./components/TaskItem";
import TaskModal from "./components/TaskModal";
import { useAuth } from "./context/authContext";
import {
  fetchUserLists,
  addList,
  deleteList,
  fetchUserTasks,
  editTask,
  deleteTask,
  addTask,
} from "./api/api";
import { Button } from "@mui/material";

function App() {
  const { currentUser, isAuthenticated, logout, loading } = useAuth();
  const [lists, setLists] = useState([]);
  const [activeListId, setActiveListId] = useState(null);
  const [activeListTasks, setActiveListTasks] = useState([]);
  const [isLoadingListData, setIsLoadingListData] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskFormData, setTaskFormData] = useState(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userListsRes = await fetchUserLists();
        if (userListsRes.ok) {
          const userLists = await userListsRes.json();
          setLists(userLists);
          setActiveListId(userLists.length > 0 ? userLists[0].ListID : null);
        } else {
          console.error("Error loading user data");
        }
      } catch (err) {
        console.error("Error loading user data:", err);
      }
    };

    if (isAuthenticated) {
      loadUserData();
    }
  }, [currentUser, isAuthenticated]);

  useEffect(() => {
    const loadActiveListData = async () => {
      if (!activeListId) {
        setActiveListTasks([]);
        return;
      }

      setIsLoadingListData(true);
      try {
        const tasksRes = await fetchUserTasks(activeListId);
        if (tasksRes.ok) {
          const tasks = await tasksRes.json();
          setActiveListTasks(tasks);
        } else {
          console.error("Error loading tasks");
        }
      } catch (err) {
        console.error("Error loading tasks:", err);
      } finally {
        setIsLoadingListData(false);
      }
    };

    loadActiveListData();
  }, [activeListId]);

  const handleAddList = async (title) => {
    try {
      const res = await addList(title);
      if (res.ok) {
        const newList = await res.json();
        setLists((prev) => [...prev, newList]);
        setActiveListId(newList.ListID);
      }
    } catch (err) {
      console.error("Error adding list:", err);
    }
  };

  const handleDeleteList = async (listIdToDelete) => {
    try {
      const res = await deleteList(listIdToDelete);
      if (res.ok) {
        const newLists = lists.filter((list) => list.ListID !== listIdToDelete);
        setLists(newLists);
        if (activeListId === listIdToDelete) {
          setActiveListId(newLists.length > 0 ? newLists[0].ListID : null);
        }
      }
    } catch (err) {
      console.error("Error deleting list:", err);
    }
  };

  const handldeDeleteTask = async (taskId) => {
    try {
      const res = await deleteTask(taskId);
      if (res.ok) {
        setActiveListTasks((prevTasks) =>
          prevTasks.filter((task) => task.TaskID !== taskId)
        );
      } else {
        console.error("Error deleting task");
      }
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const handleToggleComplete = async (taskId) => {
    try {
      const taskToUpdate = activeListTasks.find(
        (task) => task.TaskID === taskId
      );
      const updatedTask = { IsCompleted: !taskToUpdate.IsCompleted };
      const res = await editTask(taskId, updatedTask);

      if (res.ok) {
        setActiveListTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.TaskID === taskId ? { ...task, ...updatedTask } : task
          )
        );
      } else {
        console.error("Error toggling task completion");
      }
    } catch (err) {
      console.error("Error toggling task completion:", err);
    }
  };

  const openNewTaskModal = () => {
    setTaskFormData(null);
    setIsTaskModalOpen(true);
  };

  const openEditTaskModal = (task) => {
    setTaskFormData({
      id: task.TaskID,
      text: task.Title,
      description: task.Description,
      dueDate: task.DueDate,
      priority:
        task.Priority === "High" ? 3 : task.Priority === "Medium" ? 2 : 1,
    });
    setIsTaskModalOpen(true);
  };

  const closeTaskModal = () => {
    setIsTaskModalOpen(false);
    setTaskFormData(null);
  };

  const handleSaveTask = async (taskData) => {
    // Obtener la fecha de hoy en formato ISO (solo fecha, sin hora)
    const today = new Date();
    const todayISO = today.toISOString().split("T")[0];

    const formattedData = {
      Title: taskData.text,
      Description: taskData.description,
      DueDate: taskData.dueDate
        ? new Date(taskData.dueDate).toISOString()
        : new Date(todayISO).toISOString(),
      Priority:
        taskData.priority === 3
          ? "High"
          : taskData.priority === 2
          ? "Medium"
          : "Low",
      ListID: taskData.listId,
      IsCompleted: false,
    };

    try {
      if (taskData.id) {
        const res = await editTask(taskData.id, formattedData);
        if (res.ok) {
          const updatedTask = await res.json();
          setActiveListTasks((prev) =>
            prev.map((t) => (t.TaskID === taskData.id ? updatedTask : t))
          );
        }
      } else {
        const res = await addTask(formattedData);
        if (res.ok) {
          const newTask = await res.json();
          setActiveListTasks((prev) => [...prev, newTask]);
        }
      }
    } catch (err) {
      console.error("Error saving task:", err);
    } finally {
      closeTaskModal();
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (!isAuthenticated) return <Login />;

  const activeList = lists.find((list) => list.ListID === activeListId);

  return (
    <div className="App">
      <Sidebar
        user={currentUser}
        lists={lists}
        activeList={activeListId}
        setActiveList={setActiveListId}
        onAddList={handleAddList}
        onLogout={logout}
        onDeleteList={handleDeleteList}
      />
      <div className="list-content">
        {isLoadingListData ? (
          <p>Loading list...</p>
        ) : activeList ? (
          <div>
            <h2>{activeList.Title}</h2>
            <Button
              variant="contained"
              onClick={openNewTaskModal}
              style={{ marginBottom: 16 }}
            >
              Add Task
            </Button>
            {activeListTasks.length > 0 ? (
              <ul>
                {activeListTasks.map((task) => (
                  <TaskItem
                    key={task.TaskID}
                    task={task}
                    onDeleteTask={handldeDeleteTask}
                    onToggleComplete={handleToggleComplete}
                    onEditTask={() => openEditTaskModal(task)}
                  />
                ))}
              </ul>
            ) : (
              <p>No tasks in this list</p>
            )}
          </div>
        ) : (
          <p>Select a list to view its content</p>
        )}
      </div>
      <TaskModal
        open={isTaskModalOpen}
        onClose={closeTaskModal}
        onSave={handleSaveTask}
        initialData={taskFormData}
        listId={activeListId}
      />
    </div>
  );
}

export default App;
