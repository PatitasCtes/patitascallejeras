import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import HeroScreen from "../components/HeroScreen/HeroScreen";
import imgSrc from "../assets/profile.png"; // Imagen de perfil, puedes cambiar esta ruta según tu imagen

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "Emerson Matijasevic",
    email: "emerson@example.com",
    bio: "Desarrollador apasionado por crear soluciones eficientes con tecnologías modernas.",
    photoURL: imgSrc, // Imagen de perfil por defecto
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      const teamId = "123456"; // Hardcodeando el teamId
      try {
        const response = await fetch(
          `https://taskban-user.netlify.app/.netlify/functions/server/users?teamId=${teamId}`
        );
        if (response.ok) {
          const data = await response.json();
          if (data.length > 0) {
            const user = data[0]; // Suponiendo que quieres el primer usuario
            setProfile({
              name: user.name,
              email: user.email,
              bio: user.description,
              photoURL: user.photoURL, // Actualiza la URL de la foto
            });
          }
        } else {
          console.error("Error fetching user profile:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

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
        imagen={profile.photoURL} // Aquí se pasa la imagen del perfil
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
