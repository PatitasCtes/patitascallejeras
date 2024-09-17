import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import HeroScreen from "../components/HeroScreen/HeroScreen";
import imgSrc from "../assets/profile.png"; // Imagen de perfil, puedes cambiar esta ruta según tu imagen

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "Emerson Matijasevic",
    email: "emerson@example.com",
    bio: "Desarrollador apasionado por crear soluciones eficientes con tecnologías modernas.",
  });

  const handleEditProfile = () => {
    // Lógica de edición de perfil (puedes abrir un modal o hacer algo más)
    console.log("Editar perfil");
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* HeroScreen con información del perfil */}
      <HeroScreen
        titulo="Perfil"
        descripcion="Administra la información de tu perfil."
        imagen={imgSrc} // Aquí puedes pasar la imagen de perfil
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          mt: 3,
          p: 3,
          bgcolor: "#f5f5f5",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        {/* Información del perfil */}
        <Typography variant="h4" gutterBottom>
          {profile.name}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {profile.email}
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ mb: 3 }}>
          {profile.bio}
        </Typography>

        {/* Botón para editar perfil */}
        <Button variant="contained" color="primary" onClick={handleEditProfile}>
          Editar Perfil
        </Button>
      </Box>
    </Box>
  );
};

export default Profile;
