import { getRandomEmoji } from "../utils/getRandomEmoji";
import { Container, Box, Button, Typography, IconButton } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import ItemDetailList from "../components/ItemDetailList/ItemDetailList";

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
            En adopción {getRandomEmoji()}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1, // Espaciado entre botones
            }}
          >
            <IconButton
              color="primary"
              onClick={handleAddAdoption}
              sx={{ marginRight: { sm: 1 }, margin: { xs: "0 auto", sm: "0" } }} // Centrado en móvil
            >
              <AddIcon />
            </IconButton>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleAddAdoption}
              sx={{ width: { xs: "100%", sm: "auto" } }} // Botón de ancho completo en móvil
            >
              No me decido
            </Button>
          </Box>
        </Box>
      </Box>

      <ItemDetailList />
    </Container>
  );
};

export default Adoptions;
