import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import HeroScreen from "../components/HeroScreen/HeroScreen";
import CardList from "../components/CardList/CardList";

const Boards = () => {
  const [boards, setBoards] = useState([
    { id: 1, name: "Board 1", description: "Description for Board 1" },
    { id: 2, name: "Board 2", description: "Description for Board 2" },
    { id: 3, name: "Board 3", description: "Description for Board 3" },
  ]);

  // Función para eliminar un tablero
  const handleDelete = (id) => {
    setBoards(boards.filter((board) => board.id !== id));
  };

  // Función para editar un tablero (placeholder para lógica real)
  const handleEdit = (id) => {
    console.log("Editar tablero con id:", id);
  };

  // Función para agregar un nuevo tablero
  const handleAdd = () => {
    const newBoard = {
      id: boards.length + 1,
      name: `Board ${boards.length + 1}`,
      description: `Description for Board ${boards.length + 1}`,
    };
    setBoards([...boards, newBoard]);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Aquí pasamos los props a HeroScreen */}
      <HeroScreen
        titulo="Tableros"
        descripcion="Administra y organiza tus tableros fácilmente."
        imagen="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/100/external-boards-office-and-office-supplies-flaticons-lineal-color-flat-icons-2.png"
      />
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 3 }}
        onClick={handleAdd}
      >
        Agregar Nuevo Tablero
      </Button>
      <CardList boards={boards} onDelete={handleDelete} onEdit={handleEdit} />
    </Box>
  );
};

export default Boards;
