import { getRandomEmoji } from "../utils/getRandomEmoji";
import { Container, Button } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Usamos useNavigate en lugar de useHistory
import ItemDetailList from "../components/ItemDetailList/ItemDetailList";

const Adoptions = () => {
  const navigate = useNavigate(); // Usamos navigate en lugar de history

  const handleAddAdoption = () => {
    navigate("/add-pet"); // Redirigir a la página de formulario para agregar un nuevo pet
  };

  return (
    <Container>
      <h1>En adopción {getRandomEmoji()}</h1>

      <Button
        variant="contained"
        color="primary"
        onClick={handleAddAdoption}
        sx={{ marginBottom: 2 }}
      >
        Agregar nueva adopción
      </Button>

      <ItemDetailList />
    </Container>
  );
};

export default Adoptions;
