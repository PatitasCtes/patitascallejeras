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
        Bienvenido a la mejor compañia de la organización.
      </Typography>
      <Box
        sx={{
          width: "100%",
          maxWidth: 1000,
          height: "60vh",
          position: "relative",
          overflow: "hidden",
          borderRadius: 2,
          boxShadow: 3,
          backgroundImage: `url('../cartelera.jpeg')`,
          backgroundSize: "contain",
          backgroundPosition: "center",
        }}
      ></Box>
    </Box>
  );
};

export default Home;
