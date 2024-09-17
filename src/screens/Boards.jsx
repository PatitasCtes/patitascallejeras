import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import HeroScreen from "../components/HeroScreen/HeroScreen";
import CardList from "../components/CardList/CardList";
import imgSrc from "../assets/board.png";

const Boards = () => {
  const [boards, setBoards] = useState([]);

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
        imagen={imgSrc}
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
