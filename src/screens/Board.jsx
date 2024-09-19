import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { useParams } from "react-router-dom"; // Importar useParams
import HeroScreen from "../components/HeroScreen/HeroScreen";
import Loader from "../components/Loader/Loader";
import ListContainer from "../components/ColumnContainer/ColumnContainer";
import imgSrc from "../assets/cartelera3.jpeg";

const Board = () => {
  const { id } = useParams(); // Obtener el id de la URL
  const [board, setBoard] = useState(null); // Estado para almacenar la info del tablero
  const [isLoading, setIsLoading] = useState(true); // Estado de carga
  const [isError, setIsError] = useState(false); // Estado de error

  // Función para obtener los detalles del tablero
  const fetchBoardDetails = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://taskban-boards.netlify.app/.netlify/functions/server/boards/${id}`
      );
      const data = await response.json();
      setBoard(data); // Guardar los detalles del tablero
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching board details:", error);
      setIsError(true);
      setIsLoading(false);
    }
  };

  // Llamar a fetchBoardDetails al montar el componente
  useEffect(() => {
    if (id) {
      fetchBoardDetails();
    }
  }, [id]);

  const handleAdd = () => {
    console.log("Agregar Nueva Lista");
  };

  return (
    <Box sx={{ p: 3 }}>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Sim isFail={true} />
      ) : (
        <HeroScreen
          titulo={board?.name || "Tablero"}
          descripcion={board?.description || "Sin descripción"}
          imagen={imgSrc}
        />
      )}

      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 3 }}
        onClick={handleAdd}
      >
        Agregar Nueva Lista
      </Button>

      <ListContainer boardId={id} />
    </Box>
  );
};

export default Board;
