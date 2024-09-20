import React from "react";
import { Box, Typography } from "@mui/material";
import { getRandomEmoji } from "../../utils/getRandomEmoji.js";

const HeroScreen = ({ titulo, descripcion, imagen }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "left",
        bgcolor: "#f5f5f5",
        p: 3,
        mb: 3,
        borderRadius: 2,
        boxShadow: 3,
        flexDirection: { xs: "column", sm: "row" }, // En pantallas pequeñas, coloca el texto e imagen en columna
      }}
    >
      {/* Contenedor del texto */}
      <Box sx={{ flex: 1, pr: 3 }}>
        <Typography variant="h2" gutterBottom sx={{ mb: 3 }}>
          {titulo}
        </Typography>
        <Typography variant="h6">
          {descripcion + " " + getRandomEmoji()}
        </Typography>
      </Box>

      {/* Contenedor de la imagen */}
      <Box
        sx={{
          flex: 1,
          display: { xs: "none", sm: "flex" }, // Ocultar la imagen en pantallas xs (menor de 600px)
          justifyContent: "center",
        }}
      >
        <img
          src={imagen}
          alt="Imagen del tablero"
          style={{
            maxWidth: "200px",
            height: "auto",
            borderRadius: "8px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        />
      </Box>
    </Box>
  );
};

export default HeroScreen;
