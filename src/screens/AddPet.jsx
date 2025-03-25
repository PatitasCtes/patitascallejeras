import { useState } from "react";
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
  Checkbox,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { addPet } from "./../api/api";
import dayjs from "dayjs"; // Importar dayjs para uso de fechas
import PetBook from "../components/PetBook/PetBook";
import PetSizeSelector from "../components/PetSizeSelector/PetSizeSelector"; // Importa tu componente

const AddPet = () => {
  const navigate = useNavigate();

  const [petData, setPetData] = useState({
    name: "",
    description: "",
    breed: "",
    age: "",
    petUID: "22",
    animal: "",
    sponsor: "",
    obs: "",
    status: "Disponible",
    castred: false,
    castredObs: "",
    vaccinated: false,
    vaccinatedObs: "",
    feelingsWithCats: 5,
    feelingsWithCatsObs: "",
    feelingsWithDogs: 5,
    feelingsWithDogsObs: "",
    feelingsWithPeople: 5,
    feelingsWithPeopleObs: "",
    bookID: "",
    litter: null,
    adopter: null,
    adoptionDate: "",
    rescueDate: dayjs().toISOString().substring(0, 10),
    birthdate: "",
    size: null, // Para almacenar el peso seleccionado
    gender: "",
  });

  const [newPetId, setNewPetId] = useState(null);

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

  const handleSizeSelect = (size) => {
    setPetData((prevData) => ({
      ...prevData,
      size,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newPet = await addPet(petData);
      setNewPetId(newPet.petId);
    } catch (error) {
      console.error("Error al agregar el pet:", error);
    }
  };

  const handleCancel = () => {
    navigate("/adoptions");
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Agregar nueva mascota
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nombre"
              name="name"
              value={petData.name}
              onChange={handleInputChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Raza"
              name="breed"
              value={petData.breed}
              onChange={handleInputChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Edad"
              name="age"
              value={petData.age}
              onChange={handleInputChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Descripción"
              name="description"
              value={petData.description}
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
              value={petData.sponsor}
              onChange={handleInputChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Animal</InputLabel>
              <Select
                name="animal"
                value={petData.animal}
                onChange={handleInputChange}
                required
              >
                <MenuItem value="Dog">Perro</MenuItem>
                <MenuItem value="Cat">Gato</MenuItem>
                <MenuItem value="Other">Otro</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Selecciona el tamaño:
            </Typography>
            <PetSizeSelector
              animal={petData.animal.toLowerCase()}
              onWeightSelect={handleSizeSelect}
              weight={petData.size}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Género:
            </Typography>
            <RadioGroup
              row
              name="gender"
              value={petData.gender}
              onChange={handleInputChange}
            >
              <FormControlLabel value="Macho" control={<Radio />} label="Macho" />
              <FormControlLabel value="Hembra" control={<Radio />} label="Hembra" />
            </RadioGroup>
          </Grid>

          {!newPetId && (
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit">
                Agregar mascota
              </Button>
            </Grid>
          )}

          {!newPetId && (
            <Grid item xs={12}>
              <Button variant="outlined" color="error" onClick={handleCancel}>
                Cancelar
              </Button>
            </Grid>
          )}
        </Grid>
      </form>

      {newPetId && <PetBook petId={newPetId} />}
    </Container>
  );
};

export default AddPet;
