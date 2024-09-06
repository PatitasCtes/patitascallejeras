import React from "react";
import { Box, Typography } from "@mui/material";

const Profile = () => {
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
      <Typography variant="h1" gutterBottom sx={{ mb: 3 }}>
        Perfil
      </Typography>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        Seccion Perfil Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        Fugit placeat voluptatum adipisci enim dolores corrupti suscipit iure,
        reprehenderit ipsam blanditiis at sequi culpa sed eveniet, ratione
        architecto ullam, neque praesentium.
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
        }}
      ></Box>
    </Box>
  );
};

export default Profile;
