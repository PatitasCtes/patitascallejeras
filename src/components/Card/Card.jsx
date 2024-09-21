import React, { useState, useEffect } from "react";
import {
  Card as MUICard,
  CardContent,
  Typography,
  IconButton,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";

const Card = ({ task, onDelete, onEdit, refresh }) => {
  const [selectedColumn, setSelectedColumn] = useState(task.columnId);
  const [columns, setColumns] = useState([]);

  // Cargar los datos del tablero desde localStorage
  useEffect(() => {
    const boardData = JSON.parse(localStorage.getItem("boardData"));
    if (boardData && boardData.columns) {
      setColumns(boardData.columns);
    }
  }, []);

  // Formatear fechas
  const startDate = new Date(task.estimatedStartDate).toLocaleDateString();
  const finishDate = new Date(task.estimatedFinishDate).toLocaleDateString();

  // Manejador del cambio de columna
  const handleChangeColumn = async (event) => {
    const newColumnId = event.target.value;
    setSelectedColumn(newColumnId);

    // Hacer un PUT a la API para actualizar la columna de la tarea
    const response = await fetch(
      `https://taskban-task.netlify.app/.netlify/functions/server/tasks/${task.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...task,
          columnId: newColumnId,
        }),
      }
    );

    if (!response.ok) {
      console.error("Error al actualizar la tarea");
    } else {
      window.location.reload();
    }
  };

  return (
    <MUICard
      sx={{
        maxWidth: 345,
        m: 2,
        boxShadow: 3,
        cursor: "pointer",
        ":hover": { boxShadow: 6 },
      }}
    >
      <CardContent>
        <Typography variant="h5" component="div">
          {task.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {task.description}
        </Typography>

        <Box sx={{ mt: 2 }}>
          <Typography variant="body2">
            Estimado: {startDate} - {finishDate}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "primary.main", fontWeight: "bold" }}
          >
            Puntos: {task.points}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <PersonIcon sx={{ mr: 1 }} />
            <Typography variant="body2">
              Asignado a: {task.userAssigned}
            </Typography>
          </Box>
        </Box>

        {/* Dropdown para seleccionar la columna */}
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="select-column-label">Cambiar Columna</InputLabel>
          <Select
            labelId="select-column-label"
            value={selectedColumn}
            label="Cambiar Columna"
            onChange={handleChangeColumn}
          >
            {columns.map((column) => (
              <MenuItem key={column.id} value={column.id}>
                {column.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </CardContent>

      <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
        <IconButton
          sx={{ color: "primary.main", ":hover": { color: "secondary.main" } }}
          onClick={(e) => {
            e.stopPropagation();
            onEdit(task.id);
          }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          sx={{ color: "primary.main", ":hover": { color: "secondary.main" } }}
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task.id);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </MUICard>
  );
};

export default Card;
