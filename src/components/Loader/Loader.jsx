import React from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "./cat-loader.json";

const Loader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "50vh",
      }}
    >
      <Player
        autoplay
        loop
        src={animationData}
        style={{ height: "150px", width: "150px" }}
      />
      <CircularProgress color="primary" sx={{ mt: 2 }} />
      <Typography variant="h6" sx={{ mt: 2 }}>
        Cargando datos, por favor espera...
      </Typography>
    </Box>
  );
};

export default Loader;
