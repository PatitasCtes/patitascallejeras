import React from "react";
import {
  Card as MUICard,
  CardContent,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";

const Card = ({ task, onDelete, onEdit }) => {
  // Formatear fechas
  const startDate = new Date(task.estimatedStartDate).toLocaleDateString();
  const finishDate = new Date(task.estimatedFinishDate).toLocaleDateString();

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
