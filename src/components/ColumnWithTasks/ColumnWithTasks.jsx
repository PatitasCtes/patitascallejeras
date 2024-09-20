import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CardList from "../CardList/CardList";
import PopupCard from "../PopupCard/PopupCard";
import Sim from "../Sim/Sim";

const ColumnWithTasks = ({ boardId, column, tasks, reloadTasks }) => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupMode, setPopupMode] = useState("create"); // 'create' or 'edit'
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [isFail, setIsFail] = useState(false); // Estado para manejar el fallo
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false); // Estado para el diálogo de confirmación

  const handleCreateTask = async (taskDetails) => {
    const response = await fetch(
      `https://taskban-task.netlify.app/.netlify/functions/server/tasks`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: taskDetails.name,
          description: taskDetails.description,
          boardId: boardId, // Usando el boardId pasado como prop
          columnId: column.id, // Usando el columnId
          createdUser: "1KfJzumzPqNG1bZumZiE", // Hardcodeado para el usuario que crea
          createdDate: new Date().toISOString(), // Fecha de creación actual
          tutorUser: taskDetails.tutor, // Usando el tutor del taskDetails
          status: taskDetails.status || "in progress", // Valor por defecto
          points: taskDetails.points || 0, // Valor por defecto
          estimatedStartDate: taskDetails.startDate, // Usando startDate del taskDetails
          estimatedFinishDate: taskDetails.endDate, // Usando endDate del taskDetails
          userAssigned: taskDetails.userAssigned, // Usando el nombre del usuario asignado
          userInvolved: JSON.stringify(taskDetails.involvedUsers), // Convertir a JSON
        }),
      }
    );

    if (response.ok) {
      setPopupOpen(false);
      setIsFail(false); // Reseteamos el estado de fallo
      reloadTasks(); // Recargar las tareas desde el componente padre
    } else {
      console.error("Error al crear la tarea:", response.statusText);
      setIsFail(true); // Establecemos el estado de fallo
    }
  };

  const handleEditTask = async (taskId, taskDetails) => {
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
      reloadTasks(); // Recargar las tareas desde el componente padre
    }
  };

  const handleDeleteTask = async (taskId) => {
    const response = await fetch(
      `https://taskban-task.netlify.app/.netlify/functions/server/tasks/${taskId}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      reloadTasks(); // Recargar las tareas desde el componente padre
    }
  };

  const handleDeleteColumn = async () => {
    const response = await fetch(
      `https://taskban-boards.netlify.app/.netlify/functions/server/boards/${boardId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          columns: columns.filter((col) => col.id !== column.id), // Filtra la columna a eliminar
        }),
      }
    );

    if (response.ok) {
      reloadTasks(); // Recargar las tareas desde el componente padre
    }
    setConfirmDialogOpen(false); // Cerrar el diálogo de confirmación
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
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography variant="h6" align="center" gutterBottom>
          {column.name}
          <IconButton
            color="error"
            onClick={() => setConfirmDialogOpen(true)} // Abrir el diálogo de confirmación
          >
            <DeleteIcon />
          </IconButton>
        </Typography>
        <IconButton
          color="primary"
          onClick={() => {
            setPopupMode("create");
            setPopupOpen(true);
          }}
        >
          <AddIcon />
        </IconButton>
      </Box>

      {isFail && <Sim isFail={true} />}

      <CardList
        tasks={tasks}
        onDelete={handleDeleteTask}
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

      {/* Diálogo de Confirmación */}
      <Dialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
      >
        <DialogTitle>Eliminar Columna</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que deseas eliminar esta columna?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDeleteColumn} color="error">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ColumnWithTasks;
