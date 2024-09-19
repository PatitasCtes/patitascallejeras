import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import HeroScreen from "../components/HeroScreen/HeroScreen";

import imgSrc from "../assets/team.png";

const Team = () => {
  const [teams, setTeams] = useState([]);

  // Función para eliminar un equipo
  const handleDelete = (id) => {
    setTeams(teams.filter((team) => team.id !== id));
  };

  // Función para agregar un nuevo equipo
  const handleAdd = () => {
    const newTeam = {
      id: teams.length + 1,
      name: `Team ${teams.length + 1}`,
      description: `Description for Team ${teams.length + 1}`,
    };
    setTeams([...teams, newTeam]);
  };

  return (
    <Box sx={{ p: 3 }}>
      <HeroScreen
        titulo="Equipos"
        descripcion="Administra y organiza tus equipos fácilmente."
        imagen={imgSrc}
      />
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 3 }}
        onClick={handleAdd}
      >
        Agregar Nuevo Equipo
      </Button>
    </Box>
  );
};

export default Team;
