import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Container, Grid } from "@mui/material";
import Card from "../Card/Card";
import Loader from "../Loader/Loader";
import Sim from "../Sim/Sim"; // Importamos Sim

const CardList = () => {
  const [boards, setBoards] = useState([]);
  const [isSim, setActiveSim] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false); // Nuevo estado para manejar el error
  const navigate = useNavigate();

  // Función para manejar el clic en la card
  const handleCardClick = (boardId) => {
    navigate(`/board/${boardId}`); // Redirigir a la página del tablero específico
  };

  // Función para hacer scroll hacia el final
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight, // Desplaza al final de la página
      behavior: "smooth", // Animación suave
    });
  };

  // Obtener los datos desde el endpoint
  useEffect(() => {
    fetch("http://localhost:4004/api/boards")
      .then((result) => result.json())
      .then((data) => {
        setBoards(data);
        setIsLoading(false);
        // Si no hay tableros, activa Sim
        if (data.length === 0) {
          setActiveSim(true);
        }
        scrollToBottom(); // Hacer scroll una vez que los datos han sido cargados
      })
      .catch((err) => {
        console.error("Error consumiendo API: " + err);
        setIsLoading(false);
        setIsError(true); // Marca que hubo un error
        setActiveSim(true); // Activa Sim en caso de error
        scrollToBottom(); // Asegura que también haga scroll en caso de error
      });
  }, []);

  return (
    <Container>
      {isLoading ? (
        <Loader />
      ) : isSim ? (
        <Sim isFail={isError} /> // Si no hay tableros o hubo un error, muestra Sim con el estado correspondiente
      ) : (
        <Box
          sx={{
            maxHeight: "80vh", // Altura máxima del contenedor
            overflowY: "auto", // Habilita el scroll vertical
            padding: 2,
          }}
        >
          <Grid container spacing={3} sx={{ justifyContent: "center" }}>
            {boards.map((board) => (
              <Grid item xs={12} sm={6} md={4} key={board.id}>
                <Card
                  board={board}
                  onDelete={(id) => console.log("Eliminar board con id:", id)} // Manejador de eliminación
                  onEdit={(id) => console.log("Editar board con id:", id)} // Manejador de edición
                  onClick={() => handleCardClick(board.id)} // Redirige al hacer clic en la card
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default CardList;
