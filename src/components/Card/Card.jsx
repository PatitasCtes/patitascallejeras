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
import getRandomEmoji from "../../utils/getRandomEmoji";

const Card = ({ board, onDelete, onEdit, onClick }) => {
  return (
    <MUICard
      sx={{
        maxWidth: 345,
        m: 2,
        boxShadow: 3,
        cursor: "pointer", // El cursor cambiará a pointer cuando el mouse esté sobre la card
        ":hover": { boxShadow: 6 }, // Aumentar el shadow al pasar el mouse
      }}
      onClick={onClick} // Aquí definimos la acción que hará click en toda la card
    >
      <CardContent>
        <Typography variant="h5" component="div">
          {board.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {board.description + " " + getRandomEmoji()}
        </Typography>
      </CardContent>
      <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
        <IconButton
          sx={{
            color: "primary.main",
            ":hover": { color: "secondary.main" },
            zIndex: 1, // Aseguramos que los botones sigan siendo clickeables
          }}
          onClick={(e) => {
            e.stopPropagation(); // Evitar que el click en el botón dispare el click en la card
            onEdit(board.id);
          }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          sx={{
            color: "primary.main",
            ":hover": { color: "secondary.main" },
            zIndex: 1, // Aseguramos que los botones sigan siendo clickeables
          }}
          onClick={(e) => {
            e.stopPropagation(); // Evitar que el click en el botón dispare el click en la card
            onDelete(board.id);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </MUICard>
  );
};

export default Card;
