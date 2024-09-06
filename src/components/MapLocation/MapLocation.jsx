import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import Loader from "../Loader/Loader";

const MapLocation = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 2,
        position: "relative", // Para posicionar el loader en relación al contenedor
      }}
    >
      {isLoading && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(255, 255, 255, 0.7)", // Fondo semitransparente
          }}
        >
          <Loader />
        </Box>
      )}
      <Typography variant="h5" gutterBottom>
        - mapa de ejemplo gratuito -
      </Typography>
      <Box sx={{ width: "100%", maxWidth: 800, height: 450 }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093747!2d144.9537353156786!3d-37.81627917975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f1d6e4c9%3A0x5045675218ce7e0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sau!4v1611214600000!5m2!1sen!2sau"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          onLoad={handleLoad} // Oculta el loader cuando el mapa se carga
        ></iframe>
      </Box>
    </Box>
  );
};

export default MapLocation;
