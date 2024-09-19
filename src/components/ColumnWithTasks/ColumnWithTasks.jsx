import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import CardList from "../CardList/CardList";
import PopupCard from "../PopupCard/PopupCard";

const ColumnWithTasks = ({ boardId, column, fetchTasks }) => {
  const [tasks, setTasks] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupMode, setPopupMode] = useState("create"); // 'create' or 'edit'
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const loadTasks = async () => {
    try {
      const tasks = await fetchTasks(column.id);
      setTasks(Array.isArray(tasks) ? tasks : []); // Verifica que sea un array
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setTasks([]); // Establece un array vacío en caso de error
    }
  };
  useEffect(() => {
    loadTasks();
  }, [boardId, column.id, fetchTasks]);

  const handleCreateTask = async (taskDetails) => {
    // Lógica para crear una nueva tarea usando la API
    const response = await fetch(
      `https://taskban-task.netlify.app/.netlify/functions/server/tasks`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...taskDetails, boardId: column.id }),
      }
    );

    if (response.ok) {
      setPopupOpen(false);
      // Recargar las tareas después de la creación
      const tasks = await fetchTasks(column.id);
      setTasks(tasks);
    }
  };

  const handleEditTask = async (taskId, taskDetails) => {
    // Lógica para editar una tarea usando la API
    const response = await fetch(
      `https://taskban-task.netlify.app/.netlify/functions/server/tasks/${taskId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskDetails),
      }
    );

    if (response.ok) {
      setPopupOpen(false);
      // Recargar las tareas después de la edición
      const tasks = await fetchTasks(column.id);
      setTasks(tasks);
    }
  };

  const handleDeleteTask = async (taskId) => {
    // Lógica para eliminar una tarea usando la API
    const response = await fetch(
      `https://taskban-task.netlify.app/.netlify/functions/server/tasks/${taskId}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      // Recargar las tareas después de la eliminación
      const tasks = await fetchTasks(column.id);
      setTasks(tasks);
    }
  };

  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        borderRadius: "4px",
        width: "300px",
        padding: "8px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Typography variant="h6" align="center" gutterBottom>
        {column.name}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setPopupMode("create");
          setPopupOpen(true);
        }}
      >
        Crear Nueva Tarea
      </Button>

      <CardList
        boards={tasks}
        onDelete={(taskId) => {
          handleDeleteTask(taskId);
        }}
        onEdit={(taskId) => {
          setSelectedTaskId(taskId);
          setPopupMode("edit");
          setPopupOpen(true);
        }}
      />

      <PopupCard
        open={popupOpen}
        onClose={() => setPopupOpen(false)}
        itemId={selectedTaskId}
        mode={popupMode}
        onCreate={handleCreateTask}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
      />
    </Box>
  );
};

export default ColumnWithTasks;
