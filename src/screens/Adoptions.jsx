import { getRandomEmoji } from "../utils/getRandomEmoji";
import { Container, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Usamos useNavigate en lugar de useHistory
import ItemDetailList from "../components/ItemDetailList/ItemDetailList";

const Adoptions = () => {
  const navigate = useNavigate(); // Usamos navigate en lugar de history

  const handleAddAdoption = () => {
    navigate("/add-pet"); // Redirigir a la página de formulario para agregar un nuevo pet
  };

  return (
    <Container>
      <Box
        sx={{
          position: "sticky",
          top: 0,
          background: "white",
          zIndex: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 1,
        }}
      >
        <h1>En adopción {getRandomEmoji()}</h1>

        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddAdoption}
            sx={{ marginRight: 1 }}
          >
            Agregar nueva adopción
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleAddAdoption}
          >
            No me decido
          </Button>
        </Box>
      </Box>

      <ItemDetailList />
    </Container>
  );
};

export default Adoptions;
