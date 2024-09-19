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

const Card = ({ task, onDelete, onEdit }) => {
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
          {task.titulo}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {task.descripcion}
        </Typography>
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
