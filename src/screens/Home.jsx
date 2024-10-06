import React from "react";
import { Box, Typography } from "@mui/material";

const Home = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        bgcolor: "#f5f5f5",
        p: 3,
      }}
    >
      <Typography variant="h2" gutterBottom sx={{ mb: 3 }}>
        TaskBan®
      </Typography>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        Bienvenido a la mejor compañía de la organización.
      </Typography>
      <Box
        sx={{
          width: "100%",
          maxWidth: 1000,
          height: 400, // Cambiado a 400 px
          position: "relative",
          overflow: "hidden",
          borderRadius: 2,
          boxShadow: 3,
          backgroundImage: `url('../cartelera.jpeg')`,
          backgroundSize: "contain",
          backgroundPosition: "center",
        }}
      >
        <iframe
          src="https://www.youtube.com/embed/iBFxMTEEM2g?autoplay=1&modestbranding=1&controls=0&fs=0&showinfo=0&rel=0&mute=1&loop=1&playlist=iBFxMTEEM2g"
          title="Background Video"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: "none",
            pointerEvents: "none", // Para evitar la interacción con el iframe
          }}
          allow="autoplay; encrypted-media"
        ></iframe>
      </Box>
    </Box>
  );
};

export default Home;


