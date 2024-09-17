import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Container, Grid } from "@mui/material";
import Card from "../Card/Card";
import Sim from "../Sim/Sim"; // Asegúrate de importar el componente Sim

const CardList = ({ boards, onDelete, onEdit }) => {
  const navigate = useNavigate();

  // Función para manejar el clic en la card
  const handleCardClick = (boardId) => {
    navigate(`/board/${boardId}`);
  };

  return (
    <Container>
      <Box
        sx={{
          maxHeight: "80vh",
          overflowY: "auto",
          padding: 2,
        }}
      >
        {boards.length === 0 ? (
          <Sim isFail={false} />
        ) : (
          <Grid container spacing={3} sx={{ justifyContent: "center" }}>
            {boards.map((board) => (
              <Grid item xs={12} sm={6} md={4} key={board.id}>
                <Card
                  board={board}
                  onDelete={() => onDelete(board.id)}
                  onEdit={() => onEdit(board.id)}
                  onClick={() => handleCardClick(board.id)}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default CardList;
