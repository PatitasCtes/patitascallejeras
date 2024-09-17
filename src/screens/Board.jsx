import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import HeroScreen from "../components/HeroScreen/HeroScreen";
import Loader from "../components/Loader/Loader";
import Sim from "../components/Sim/Sim";

const Board = () => {
  const handleAdd = () => {
    console.log("ad");
  };
  return (
    <Box sx={{ p: 3 }}>
      {/* Aquí pasamos los props a HeroScreen */}
      <HeroScreen titulo="" descripcion="" imagen="" />
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 3 }}
        onClick={handleAdd}
      >
        Agregar Nueva Lista
      </Button>

      <Sim></Sim>
    </Box>
  );
};

export default Board;
