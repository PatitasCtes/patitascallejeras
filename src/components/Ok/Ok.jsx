import React, { useContext } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "./confetti.json";

const Ok = () => {
  const { petName } = useContext(AppContext);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "20vh",
      }}
    >
      <Player
        autoplay
        loop
        src={animationData}
        style={{ height: "150px", width: "150px" }}
      />
      <Typography variant="h6" sx={{ mt: 2 }}>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Formulario enviado con &eacute;xito el {new Date().toLocaleString()}{" "}
          para {petName}
        </Typography>
      </Typography>
    </Box>
  );
};

export default Ok;
