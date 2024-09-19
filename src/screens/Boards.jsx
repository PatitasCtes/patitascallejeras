import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import HeroScreen from "../components/HeroScreen/HeroScreen";
import imgSrc from "../assets/board.png";
import PopupBoard from "../components/PopupBoard/PopupBoard";
import Loader from "../components/Loader/Loader";
import Sim from "../components/Sim/Sim";
import BoardList from "../components/BoardList/BoardList";

const Boards = () => {
  const [boards, setBoards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedBoardId, setSelectedBoardId] = useState(null); // Para manejar la edición
  const [popupMode, setPopupMode] = useState("create");

  // Función para obtener los tableros desde el API
  const fetchBoards = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://taskban-boards.netlify.app/.netlify/functions/server/boards"
      );
      const data = await response.json();
      setBoards(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching boards:", error);
      setIsError(true);
      setIsLoading(false);
    }
  };

  // Llamar a fetchBoards al montar el componente
  useEffect(() => {
    fetchBoards();
  }, []);

  // Función para eliminar un tablero
  const handleDelete = async (id) => {
    try {
      await fetch(
        `https://taskban-boards.netlify.app/.netlify/functions/server/boards/${id}`,
        {
          method: "DELETE",
        }
      );
      setBoards(boards.filter((board) => board.id !== id));
    } catch (error) {
      console.error("Error al eliminar el tablero:", error);
    }
  };

  // Función para abrir el popup de edición
  const handleEdit = (id) => {
    setSelectedBoardId(id);
    setPopupMode("edit");
    setIsPopupOpen(true);
  };

  // Función para abrir el popup de creación
  const handleAdd = () => {
    setPopupMode("create");
    setIsPopupOpen(true);
  };

  // Función para editar un tablero
  const handleUpdateBoard = async (id, updatedBoard) => {
    try {
      const response = await fetch(
        `https://taskban-boards.netlify.app/.netlify/functions/server/boards/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedBoard),
        }
      );

      if (!response.ok) {
        throw new Error("Error al actualizar el tablero");
      }

      await fetchBoards(); // Volver a cargar los tableros actualizados
    } catch (error) {
      console.error("Error actualizando el tablero:", error);
    }
  };

  // Función para crear un nuevo tablero desde el popup
  const handleCreateBoard = async (newBoard) => {
    // Asegúrate de que columns sea un array válido
    const boardWithColumns = {
      ...newBoard,
      columns:
        newBoard.columns && newBoard.columns.length > 0
          ? newBoard.columns
          : [
              { id: 1, name: "To Do", description: "Tasks to be done" },
              { id: 2, name: "Doing", description: "Tasks in progress" },
              { id: 3, name: "Done", description: "Tasks completed" },
            ],
    };

    try {
      const response = await fetch(
        "https://taskban-boards.netlify.app/.netlify/functions/server/boards",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(boardWithColumns),
        }
      );

      if (!response.ok) {
        throw new Error("Error al crear el tablero");
      }

      await fetchBoards(); // Volver a cargar los tableros
    } catch (error) {
      console.error("Error creando el tablero:", error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
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

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Sim isFail={true} />
      ) : (
        <BoardList
          boards={boards}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}

      {/* Popup para crear/editar un tablero */}
      <PopupBoard
        open={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        itemId={selectedBoardId}
        mode={popupMode}
        onCreate={(newBoard) => {
          handleCreateBoard(newBoard);
          setIsPopupOpen(false);
        }}
        onEdit={(id, updatedBoard) => {
          handleUpdateBoard(id, updatedBoard);
          setIsPopupOpen(false);
        }}
      />
    </Box>
  );
};

export default Boards;
