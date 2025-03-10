import { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import {
  Container,
  TextField,
  Button,
  Grid,
  Typography,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fetchPetById, updatePetById } from "../api/api";
import Loader from "../components/Loader/Loader";

const EditPet = () => {
  const navigate = useNavigate();
  const { petId } = useContext(AppContext);

  const [petData, setPetData] = useState(null); // Inicialmente vacío

  useEffect(() => {
    // Cargar los datos de la mascota cuando el componente se monta
    const fetchPetData = async () => {
      try {
        const pet = await fetchPetById(petId); // Obtener datos desde la API
        setPetData(pet); // Establecer los datos iniciales
      } catch (error) {
        console.error("Error al cargar los datos de la mascota:", error);
      }
    };
    fetchPetData();
  }, [petId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPetData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSliderChange = (name) => (e, value) => {
    setPetData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (name) => (e) => {
    setPetData((prevData) => ({
      ...prevData,
      [name]: e.target.checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePetById(petId, petData); // Actualizar los datos en la API
      navigate(`/pets/${petId}`); // Navegar a la página de detalles de la mascota
    } catch (error) {
      console.error("Error al actualizar la mascota:", error);
    }
  };

  if (!petData) {
    return <Loader />;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Editar mascota
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nombre"
              name="name"
              value={petData.name || ""}
              onChange={handleInputChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Raza"
              name="breed"
              value={petData.breed || ""}
              onChange={handleInputChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Edad"
              name="age"
              value={petData.age || ""}
              onChange={handleInputChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Descripción"
              name="description"
              value={petData.description || ""}
              onChange={handleInputChange}
              multiline
              rows={4}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Patrocinador"
              name="sponsor"
              value={petData.sponsor || ""}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Animal</InputLabel>
              <Select
                name="animal"
                value={petData.animal || ""}
                onChange={handleInputChange}
                required
              >
                <MenuItem value="Dog">Perro</MenuItem>
                <MenuItem value="Cat">Gato</MenuItem>
                <MenuItem value="Other">Otro</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Incluye los sliders, observaciones y otros campos, siguiendo el patrón anterior */}
          {/* Slider: Relación con gatos */}
          <Grid item xs={12}>
            <Typography gutterBottom>Relación con gatos</Typography>
            <Slider
              value={petData.feelingsWithCats || 5}
              onChange={handleSliderChange("feelingsWithCats")}
              min={1}
              max={10}
              marks
              valueLabelDisplay="auto"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Observaciones sobre la relación con gatos"
              name="feelingsWithCatsObs"
              value={petData.feelingsWithCatsObs || ""}
              onChange={handleInputChange}
            />
          </Grid>

          {/* Resto de sliders, checkboxes y campos */}

          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Actualizar mascota
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default EditPet;
