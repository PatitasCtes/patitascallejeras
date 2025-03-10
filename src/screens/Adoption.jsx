import React, { useContext } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import { AppContext } from "../context/AppContext";

const Adoption = () => {
  const navigate = useNavigate(); // Crear instancia de useNavigate
  const { petId, petName, petPhotoUrl } = useContext(AppContext);
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
      <Typography variant="h4" gutterBottom sx={{ mb: 2 }}>
        Por favor completa el siguiente formulario para adoptar a {petName} 🐾
      </Typography>
      <img
        src={petPhotoUrl}
        alt={petName}
        style={{ width: "200px", height: "200px", borderRadius: "50%" }}
      />
      <Button
        variant="outlined"
        color="error"
        onClick={() => navigate("/adoptions")}
        sx={{ mt: 2 }}
      >
        Cancelar
      </Button>
    </Box>
  );
};

export default Adoption;
