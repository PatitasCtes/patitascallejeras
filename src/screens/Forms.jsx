import { getRandomEmoji } from "../utils/getRandomEmoji";
import { Container, Box, Button, Typography, IconButton } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import FormList from "../components/FormList/FormList";

const Adoptions = () => {
  const navigate = useNavigate();

  const handleAddAdoption = () => {
    navigate("/add-pet");
  };

  return (
    <Container>
      <Box
        sx={{
          position: "sticky",
          top: 0,
          background: "white",
          zIndex: 1,
          padding: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" }, // Cambia a columna en móvil
            justifyContent: { sm: "space-between" }, // Espaciado solo en pantallas más grandes
            alignItems: "center",
            gap: { xs: 2, sm: 0 }, // Espaciado entre elementos en móvil
          }}
        >
          <Typography
            variant="h2"
            gutterBottom
            sx={{
              fontSize: { xs: "1.5rem", sm: "2.5rem" }, // Ajusta el tamaño en móvil
              textAlign: { xs: "center", sm: "left" }, // Centra el texto en móvil
            }}
          >
            Listado de Formularios de Adopción {getRandomEmoji()}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1, // Espaciado entre botones
            }}
          >
            
          </Box>
        </Box>
      </Box>

      <FormList />
    </Container>
  );
};

export default Adoptions;
