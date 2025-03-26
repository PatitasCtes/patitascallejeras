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
    if (petData.size === size) {
      setPetData((prevData) => ({
        ...prevData,
        size: null,
      }));
    } else {
      setPetData((prevData) => ({
        ...prevData,
        size,
      }));
    }
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
            <FormControl fullWidth>
              <InputLabel>Patrocinador</InputLabel>
              <Select
                name="sponsor"
                value={petData.sponsor}
                onChange={handleInputChange}
                defaultValue="Flor Esposito"
                required
              >
                <MenuItem value="Flor Esposito">Flor Esposito</MenuItem>
                <MenuItem value="Flor Salvatierra">Flor Salvatierra</MenuItem>
                <MenuItem value="Mili Perez">Mili Perez</MenuItem>
                <MenuItem value="Naty Serranas">Naty Serranas</MenuItem>
                <MenuItem value="Otro">Otro</MenuItem>
              </Select>
            </FormControl>
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
          {petData.animal && (
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
          )}

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Sexo:
            </Typography>
            <RadioGroup
              row
              name="gender"
              value={petData.gender}
              onChange={handleInputChange}
            >
              <FormControlLabel
                value="Macho"
                control={<Radio />}
                label="Macho ♂️"
              />
              <FormControlLabel
                value="Hembra"
                control={<Radio />}
                label="Hembra ♀️"
              />
              <FormControlLabel
                value="Varios"
                control={<Radio />}
                label="Varios ⚧️"
              />
            </RadioGroup>
          </Grid>
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

          <Grid item xs={12}>
            <Typography gutterBottom>Relación con perros</Typography>
            <Slider
              value={petData.feelingsWithDogs || 5}
              onChange={handleSliderChange("feelingsWithDogs")}
              min={1}
              max={10}
              marks
              valueLabelDisplay="auto"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Observaciones sobre la relación con perros"
              name="feelingsWithDogsObs"
              value={petData.feelingsWithDogsObs || ""}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography gutterBottom>Relación con Personas</Typography>
            <Slider
              value={petData.feelingsWithPersonas || 5}
              onChange={handleSliderChange("feelingsWithPeople")}
              min={1}
              max={10}
              marks
              valueLabelDisplay="auto"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Observaciones sobre la relación con personas"
              name="feelingsWithPeopleObs"
              value={petData.feelingsWithPeopleObs || ""}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={petData.castred || false}
                  onChange={handleCheckboxChange("castred")}
                />
              }
              label="Castrado"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Observaciones sobre castración"
              name="castredObs"
              value={petData.castredObs || ""}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={petData.vaccinated || false}
                  onChange={handleCheckboxChange("vaccinated")}
                />
              }
              label="Vacunado"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Observaciones sobre vacunación"
              name="vaccinatedObs"
              value={petData.vaccinatedObs || ""}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Observaciones generales"
              name="obs"
              value={petData.obs || ""}
              onChange={handleInputChange}
            />
          </Grid>
          {!newPetId && (
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ mr: 2, ml: 4 }}
              >
                Agregar
              </Button>
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
